"use client";

import * as React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-hot-toast";
import {
  MessageSquare,
  X,
  Send,
  User,
  Compass,
  Copy,
  Sparkles
} from "lucide-react";
import { cn } from "@/utils/cn";

interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp?: string;
}

interface ChatResponse {
  reply: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "Explain TypeScript Generics.",
  "Compare React vs Vue.",
  "Create a 6-month learning plan."
];

// Simple Markdown parsing for bubble layout
function FloatingMarkdownRenderer({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g);

  const renderInlineText = (inlineText: string) => {
    const tokens = inlineText.split(/(\*\*.*?\*\*|`.*?`)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith("`") && token.endsWith("`")) {
        return <code key={idx} className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-primary dark:text-primary-light font-mono text-[9px]">{token.slice(1, -1)}</code>;
      }
      return token;
    });
  };

  return (
    <div className="flex flex-col gap-1.5 leading-relaxed text-[11px]">
      {parts.map((part, idx) => {
        if (part.startsWith("```")) {
          const lines = part.split("\n");
          const code = lines.slice(1, -1).join("\n");

          return (
            <div key={idx} className="my-1 border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden font-mono text-[9px] bg-slate-950 text-slate-100 select-text">
              <div className="flex justify-between items-center px-3 py-1 bg-slate-900 border-b border-slate-850 text-[8px] uppercase font-bold text-slate-400 select-none">
                <span>Code</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    toast.success("Copied!");
                  }}
                  className="hover:text-slate-200 transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="p-2.5 overflow-x-auto whitespace-pre">
                <code>{code}</code>
              </pre>
            </div>
          );
        } else {
          const subLines = part.split("\n");
          return (
            <div key={idx} className="flex flex-col gap-1">
              {subLines.map((line, lIdx) => {
                if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                  return (
                    <div key={lIdx} className="flex items-start gap-1.5 ml-2">
                      <span className="h-1 w-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{renderInlineText(line.trim().substring(2))}</span>
                    </div>
                  );
                }
                if (!line.trim()) return <div key={lIdx} className="h-0.5" />;
                return <p key={lIdx}>{renderInlineText(line)}</p>;
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

export function FloatingAICopilot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat box only (does not scroll whole page/footer)
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const chatMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const historyPayload = messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await apiClient.post<{ success: boolean; data: ChatResponse }>("/ai/chat", {
        message: messageText,
        history: historyPayload
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: data.reply,
          timestamp: data.timestamp
        }
      ]);
    },
    onError: (err: unknown) => {
      console.error("[FloatingAICopilot] Error:", err);
      let errMsg = "AI chat failed. Please try again.";
      if (err && typeof err === "object") {
        const axiosError = err as { response?: { data?: { error?: string } }; message?: string };
        if (axiosError.response?.data?.error) {
          errMsg = axiosError.response.data.error;
        } else if (axiosError.message) {
          errMsg = axiosError.message;
        }
      }
      toast.error(errMsg);
    }
  });

  const sendMessage = (messageText: string) => {
    if (!messageText.trim() || chatMutation.isPending) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    chatMutation.mutate(messageText);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  // Only render for authenticated user sessions
  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      
      {/* 1. Chat window popup overlay */}
      {isOpen && (
        <div className="w-[340px] md:w-[360px] h-[480px] bg-white dark:bg-[#0c1220] rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 mb-4 overflow-hidden flex flex-col animate-fade-in duration-200">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-primary/5 to-secondary/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-xs font-black text-dark-text tracking-tight">AI Co-Pilot</span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-secondary-text hover:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Message view thread */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 dark:bg-[#090d16]/5 select-text"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-6 select-none">
                <div className="h-9 w-9 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="max-w-[200px]">
                  <h4 className="text-[11px] font-black text-dark-text uppercase tracking-wider">How can I help you?</h4>
                  <p className="text-[10px] text-secondary-text mt-1 leading-normal">
                    Ask me about career goals, frameworks, generics, roadmaps or choose a prompt:
                  </p>
                </div>
                
                {/* Suggestions inside bubble */}
                <div className="flex flex-col gap-1.5 w-full mt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-[9px] font-bold text-dark-text hover:text-primary bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-850 px-2.5 py-1.5 rounded-lg text-left truncate shadow-xxs transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-2 max-w-[85%] animate-fade-in",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 select-none",
                    msg.role === "user" ? "bg-indigo-100 text-primary" : "bg-slate-100 text-secondary-text"
                  )}
                >
                  {msg.role === "user" ? <User className="h-3 w-3" /> : <Compass className="h-3 w-3" />}
                </div>

                <div
                  className={cn(
                    "rounded-xl p-3 shadow-xxs border flex flex-col gap-1 relative group",
                    msg.role === "user"
                      ? "bg-indigo-600 border-indigo-650 text-white rounded-tr-none"
                      : "bg-white dark:bg-[#0c1220] border-slate-200/60 dark:border-slate-800 text-dark-text rounded-tl-none"
                  )}
                >
                  <FloatingMarkdownRenderer text={msg.content} />
                  
                  <button
                    onClick={() => handleCopyMessage(msg.content)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-secondary-text hover:text-dark-text p-0.5 rounded bg-inherit shadow-xxs border select-none"
                    title="Copy"
                  >
                    <Copy className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>
            ))}

            {chatMutation.isPending && (
              <div className="flex gap-2 max-w-[85%] mr-auto items-center animate-pulse">
                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3 w-3 text-primary animate-spin" />
                </div>
                <div className="bg-white dark:bg-[#0c1220] border border-slate-250 dark:border-slate-800 px-4 py-2.5 rounded-xl rounded-tl-none flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-350 dark:bg-slate-600 animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-350 dark:bg-slate-600 animate-bounce delay-200" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-350 dark:bg-slate-600 animate-bounce delay-300" />
                </div>
              </div>
            )}
          </div>

          {/* Form input */}
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1220] flex gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white text-[11px] text-dark-text focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0 disabled:opacity-50 dark:bg-[#0c1220]"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={chatMutation.isPending}
              required
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || chatMutation.isPending}
              className="h-9 w-9 p-0 flex items-center justify-center bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Floating circle toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50 cursor-pointer"
        title="AI Career Co-Pilot Chat"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

    </div>
  );
}
