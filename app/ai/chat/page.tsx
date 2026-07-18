"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { PageWrapper, Section, Container, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import {
  Compass,
  Sparkles,
  ArrowLeft,
  Send,
  User,
  Copy,
  Briefcase
} from "lucide-react";
import { cn } from "@/utils/cn";

// Suggested prompt examples
const SUGGESTED_PROMPTS = [
  "Which roadmap should I choose?",
  "Compare React vs Vue.",
  "Explain TypeScript Generics.",
  "Recommend backend technologies.",
  "How do I become a Full Stack Developer?",
  "Create a 6-month learning plan."
];

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

// Inline Markdown and Formatting parser for safe client rendering
function MarkdownRenderer({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g);

  const renderInlineText = (inlineText: string) => {
    const tokens = inlineText.split(/(\*\*.*?\*\*|`.*?`)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        return <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith("`") && token.endsWith("`")) {
        return <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-primary dark:text-primary-light font-mono text-[10px]">{token.slice(1, -1)}</code>;
      }
      return token;
    });
  };

  return (
    <div className="flex flex-col gap-2 leading-relaxed text-xs">
      {parts.map((part, idx) => {
        if (part.startsWith("```")) {
          const lines = part.split("\n");
          const firstLine = lines[0];
          const lang = firstLine.replace("```", "").trim() || "code";
          const code = lines.slice(1, -1).join("\n");

          return (
            <div key={idx} className="my-2 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden font-mono text-[10px] bg-slate-950 text-slate-100 select-text">
              <div className="flex justify-between items-center px-4 py-1.5 bg-slate-900 border-b border-slate-850 text-[9px] uppercase font-bold text-slate-400 select-none">
                <span>{lang}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    toast.success("Code copied!");
                  }}
                  className="hover:text-slate-200 transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto whitespace-pre">
                <code>{code}</code>
              </pre>
            </div>
          );
        } else {
          const subLines = part.split("\n");
          return (
            <div key={idx} className="flex flex-col gap-1.5">
              {subLines.map((line, lIdx) => {
                if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 ml-3">
                      <span className="h-1 w-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{renderInlineText(line.trim().substring(2))}</span>
                    </div>
                  );
                }
                if (/^\d+\.\s/.test(line.trim())) {
                  const match = line.trim().match(/^(\d+)\.\s(.*)/);
                  if (match) {
                    return (
                      <div key={lIdx} className="flex items-start gap-2 ml-3">
                        <span className="font-bold text-primary shrink-0">{match[1]}.</span>
                        <span>{renderInlineText(match[2])}</span>
                      </div>
                    );
                  }
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

export default function AICareerChatPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const [inputMessage, setInputMessage] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Protection Check
  React.useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("Please sign in to access the AI Chat Assistant.");
      router.push("/login?redirect=/ai/chat");
    }
  }, [user, isAuthLoading, router]);

  // Auto scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // TanStack Mutation for Chat POST
  const chatMutation = useMutation({
    mutationFn: async (messageText: string) => {
      // Map existing messages to history payload expected by endpoint:
      // [{ role: 'user'|'model', content: '...' }]
      const historyPayload = messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await apiClient.post<ChatResponse>("/ai/chat", {
        message: messageText,
        history: historyPayload
      });
      return response.data;
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
      console.error("[AIChat] Error:", err);
      let errMsg = "AI chat failed. Please check your network and try again.";
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

    // Append user message immediately
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

  if (isAuthLoading || (!user && !isAuthLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
      
      {/* Header bar link */}
      <div className="bg-white dark:bg-[#0c1220]/30 py-4 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Flex align="center" justify="between" className="flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-primary dark:hover:text-primary-light transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </Flex>
        </Container>
      </div>

      <Section className="py-8 md:py-12">
        <Container>
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            
            {/* Page Header */}
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md shadow-primary/10 mb-2">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-[#090d16]">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-dark-text tracking-tight">
                AI Career Co-Pilot
              </h1>
              <p className="text-xs text-secondary-text leading-relaxed">
                Meet your interactive Career Mentor. Ask questions regarding career milestones, programming issues, roadmap selections, stack frameworks, or technical interview preparations.
              </p>
            </div>

            {/* Main Chat Interface Console */}
            <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[600px]">
              
              {/* Messages viewport panel */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/40 dark:bg-[#090d16]/10">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12 select-none">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center animate-bounce">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="max-w-xs flex flex-col gap-1.5">
                      <h3 className="text-xs font-black text-dark-text uppercase tracking-wider">Start the Conversation</h3>
                      <p className="text-xxs text-secondary-text leading-relaxed">
                        Say hello or choose one of the suggested career mentor prompts below to query recommendations.
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex gap-3 max-w-[85%] animate-fade-in",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    {/* Role Avatar symbol */}
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black select-none",
                        msg.role === "user"
                          ? "bg-indigo-100 text-primary dark:bg-indigo-950 dark:text-primary-light"
                          : "bg-slate-100 text-secondary-text dark:bg-slate-900"
                      )}
                    >
                      {msg.role === "user" ? <User className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
                    </div>

                    {/* Bubble Content container */}
                    <div
                      className={cn(
                        "rounded-2xl p-4 shadow-xxs border flex flex-col gap-2 relative group",
                        msg.role === "user"
                          ? "bg-indigo-600 border-indigo-650 text-white rounded-tr-none"
                          : "bg-white dark:bg-[#0c1220] border-border-color dark:border-slate-800/80 rounded-tl-none text-dark-text"
                      )}
                    >
                      <MarkdownRenderer text={msg.content} />

                      {/* Floating Copy / Metadata helper */}
                      <div
                        className={cn(
                          "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-inherit border dark:border-slate-850 px-1.5 py-0.5 rounded shadow-sm select-none",
                          msg.role === "user" ? "text-indigo-200 border-indigo-500" : "text-secondary-text border-slate-100"
                        )}
                      >
                        <button
                          onClick={() => handleCopyMessage(msg.content)}
                          title="Copy Message Text"
                          className="hover:scale-105 active:scale-95 transition-transform"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI Chat Typings Loader spinner bubble */}
                {chatMutation.isPending && (
                  <div className="flex gap-3 max-w-[85%] mr-auto items-center animate-pulse">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-secondary-text dark:bg-slate-900 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-primary animate-spin" />
                    </div>
                    <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/80 rounded-2xl rounded-tl-none px-5 py-3 shadow-xxs flex items-center gap-1.5 select-none">
                      <span className="h-2 w-2 rounded-full bg-slate-350 dark:bg-slate-700 animate-bounce delay-100" />
                      <span className="h-2 w-2 rounded-full bg-slate-350 dark:bg-slate-700 animate-bounce delay-200" />
                      <span className="h-2 w-2 rounded-full bg-slate-350 dark:bg-slate-700 animate-bounce delay-300" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Panel */}
              {messages.length === 0 && (
                <div className="px-5 py-4 border-t border-border-color dark:border-slate-800/20 bg-slate-50/20 dark:bg-slate-950/10">
                  <span className="text-[10px] font-black text-secondary-text uppercase tracking-widest block mb-2 px-1">
                    Suggested Mentor Prompts
                  </span>
                  <div className="flex flex-wrap gap-2 select-none">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-[10px] font-bold text-dark-text hover:text-primary hover:border-primary/40 dark:hover:text-primary-light dark:hover:border-primary-light/40 bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/85 px-3 py-1.5 rounded-lg transition-all shadow-xxs text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input Panel */}
              <div className="p-4 border-t border-border-color dark:border-slate-800/20 bg-white dark:bg-[#0c1220]">
                <form onSubmit={handleFormSubmit} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message to your career co-pilot..."
                    className="flex-1 h-11 px-4 rounded-xl border border-border-color bg-white text-sm text-dark-text placeholder-secondary-text transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 dark:bg-[#0c1220] dark:border-slate-800"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={chatMutation.isPending}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="h-11 w-11 p-0 flex items-center justify-center shrink-0 rounded-xl font-bold"
                    isLoading={chatMutation.isPending}
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4.5 w-4.5" />
                  </Button>
                </form>
              </div>

            </div>

          </div>
        </Container>
      </Section>

    </PageWrapper>
  );
}
