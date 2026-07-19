"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ClientInterviewService, InterviewHistoryMessage } from "@/services/interviewService";
import { useSaveInterview } from "@/hooks/useInterviews";
import { Brain, Send, Bot, User, CheckCircle, XCircle, ArrowRight, Loader2, Sparkles, TrendingUp, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

const CATEGORIES = ["Frontend", "Backend", "Full Stack", "React", "Node.js", "TypeScript", "MongoDB", "System Design"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const MAX_QUESTIONS = 5;

type SessionState = "setup" | "interview" | "evaluating" | "completed";

export default function NewMockInterviewPage() {
  const router = useRouter();
  const [sessionState, setSessionState] = useState<SessionState>("setup");
  
  // Setup state
  const [category, setCategory] = useState("Frontend");
  const [difficulty, setDifficulty] = useState("Intermediate");
  
  // Interview state
  const [history, setHistory] = useState<InterviewHistoryMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoadingTurn, setIsLoadingTurn] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState<string | null>(null);
  
  // Final state
  const [finalReport, setFinalReport] = useState<any>(null);
  
  const saveInterviewMutation = useSaveInterview();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, currentFeedback, isLoadingTurn]);

  const handleStart = async () => {
    setSessionState("interview");
    setIsLoadingTurn(true);
    
    try {
      const initialHistory: InterviewHistoryMessage[] = [];
      const res = await ClientInterviewService.conductMockInterviewTurn(category, difficulty, initialHistory);
      
      setHistory([{ role: "assistant", content: res.nextQuestion }]);
      setQuestionsCount(1);
    } catch (err) {
      toast.error("Failed to start interview");
      setSessionState("setup");
    } finally {
      setIsLoadingTurn(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!currentInput.trim() || isLoadingTurn) return;

    const newHistory = [...history, { role: "user" as const, content: currentInput }];
    setHistory(newHistory);
    setCurrentInput("");
    setIsLoadingTurn(true);
    setCurrentFeedback(null);

    try {
      if (questionsCount >= MAX_QUESTIONS) {
        setSessionState("evaluating");
        const res = await ClientInterviewService.conductMockInterviewFinal(category, difficulty, newHistory);
        
        setFinalReport(res);
        setSessionState("completed");
        
        // Build the questions/answers arrays for saving
        const questionsList = newHistory.filter(h => h.role === "assistant").map(h => h.content);
        const answersList = newHistory.filter(h => h.role === "user").map(h => h.content);
        
        saveInterviewMutation.mutate({
          category,
          difficulty,
          questions: questionsList,
          answers: answersList,
          scores: res.scores,
          feedback: res.feedback,
        });

      } else {
        const res = await ClientInterviewService.conductMockInterviewTurn(category, difficulty, newHistory);
        setCurrentFeedback(res.feedback);
        setHistory([...newHistory, { role: "assistant", content: res.nextQuestion }]);
        setQuestionsCount(prev => prev + 1);
      }
    } catch (err) {
      toast.error("An error occurred generating response");
      // pop the user input so they can retry
      setHistory(newHistory.slice(0, -1));
      setCurrentInput(newHistory[newHistory.length - 1].content);
      if (sessionState === "evaluating") setSessionState("interview");
    } finally {
      setIsLoadingTurn(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
        
        {sessionState === "setup" && (
          <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">AI Interview Setup</h1>
              <p className="text-gray-400 mb-8">Customize your mock interview session. The AI will ask you {MAX_QUESTIONS} questions and evaluate your answers.</p>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                          category === cat 
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Difficulty</label>
                  <div className="flex gap-3">
                    {DIFFICULTIES.map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                          difficulty === diff 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                Start Interview <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {(sessionState === "interview" || sessionState === "evaluating") && (
          <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gray-800/80 border-b border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Brain className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-white font-medium">{category} Interview</h2>
                  <p className="text-xs text-gray-400">{difficulty} Level</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-400">Progress:</span>
                <span className="text-sm font-bold text-indigo-400">{questionsCount}/{MAX_QUESTIONS}</span>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {history.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                      : 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.role === 'assistant' && currentFeedback && i === history.length - 1 && (
                      <div className="mb-4 pb-4 border-b border-gray-700/50">
                        <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-2">
                          <CheckCircle className="w-4 h-4" /> Feedback on your last answer
                        </div>
                        <p className="text-sm text-gray-300">{currentFeedback}</p>
                      </div>
                    )}
                    <div className="prose prose-invert max-w-none text-sm">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 border border-gray-600">
                      <User className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoadingTurn && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                    <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                    <span className="text-gray-400 text-sm">{sessionState === "evaluating" ? "Analyzing entire interview..." : "Interviewer is thinking..."}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            {sessionState === "interview" && (
              <div className="p-4 bg-gray-800/50 border-t border-gray-700">
                <div className="relative flex items-end gap-2">
                  <textarea
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendAnswer();
                      }
                    }}
                    placeholder="Type your answer here..."
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl p-4 pr-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-[80px]"
                  />
                  <button
                    onClick={handleSendAnswer}
                    disabled={!currentInput.trim() || isLoadingTurn}
                    className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send, Shift + Enter for new line</p>
              </div>
            )}
          </div>
        )}

        {sessionState === "completed" && finalReport && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8 pb-10">
              {/* Report Header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-xl shadow-indigo-500/20">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Interview Complete</h1>
                <p className="text-gray-400 text-lg">Here is your comprehensive performance evaluation.</p>
              </div>

              {/* Score Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="col-span-2 md:col-span-1 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 text-center">
                  <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-1">Overall</p>
                  <p className="text-3xl font-bold text-white">{finalReport.scores.overall}</p>
                </div>
                {[
                  { label: "Technical", val: finalReport.scores.technicalAccuracy },
                  { label: "Problem Solving", val: finalReport.scores.problemSolving },
                  { label: "Communication", val: finalReport.scores.communication },
                  { label: "Depth", val: finalReport.scores.depth },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 text-center">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-white">{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Feedback Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/40 border border-green-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold text-white">Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {finalReport.feedback.strengths.map((str: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300">
                        <span className="text-green-500 mt-0.5">•</span> {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/40 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold text-white">Areas for Improvement</h3>
                  </div>
                  <ul className="space-y-3">
                    {finalReport.feedback.weaknesses.map((w: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300">
                        <span className="text-red-500 mt-0.5">•</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Actionable Suggestions</h3>
                </div>
                <ul className="space-y-3">
                  {finalReport.feedback.improvementSuggestions.map((s: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span className="text-indigo-500 mt-0.5">→</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => router.push("/dashboard/interviews")}
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
