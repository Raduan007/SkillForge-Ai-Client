"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { toast } from "react-hot-toast";
import { 
  ArrowLeft, Brain, Calendar, Target, Loader2,
  CheckCircle2, AlertTriangle, Zap, MessageSquare
} from "lucide-react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from "recharts";

interface InterviewDetails {
  _id: string;
  category: string;
  difficulty: string;
  createdAt: string;
  questions: string[];
  answers: string[];
  scores: {
    technicalAccuracy: number;
    problemSolving: number;
    communication: number;
    depth: number;
    overall: number;
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
}

export default function InterviewDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [interview, setInterview] = useState<InterviewDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: InterviewDetails }>(`/interviews/${id}`);
        if (response.data.success) {
          setInterview(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch interview details", err);
        toast.error("Failed to load interview report");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchInterview();
    }
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          <p className="text-gray-400 font-medium">Generating your detailed report...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !interview) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-12 text-center bg-gray-800/20 border border-gray-800 rounded-2xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Interview Not Found</h2>
          <p className="text-gray-400 mb-6">We couldn't find the interview report you're looking for. It may have been deleted or you don't have permission to view it.</p>
          <button 
            onClick={() => router.push("/dashboard/interviews")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // Radar Chart Data
  const chartData = [
    { subject: 'Technical', A: interview.scores.technicalAccuracy, fullMark: 10 },
    { subject: 'Problem Solving', A: interview.scores.problemSolving, fullMark: 10 },
    { subject: 'Communication', A: interview.scores.communication, fullMark: 10 },
    { subject: 'Depth', A: interview.scores.depth, fullMark: 10 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
        
        {/* Navigation */}
        <button 
          onClick={() => router.push("/dashboard/interviews")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interviews
        </button>

        {/* Header Section */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Brain className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 rounded-lg">
                {interview.category}
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-700/80 text-gray-300 border border-gray-600/50 rounded-lg">
                {interview.difficulty}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Performance Report</h1>
            <div className="flex items-center gap-2 text-gray-400 font-medium">
              <Calendar className="w-4 h-4" />
              {new Date(interview.createdAt).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>

          <div className="relative z-10 text-center bg-gray-950/50 p-6 rounded-2xl border border-gray-800">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">Overall Score</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-5xl font-black ${
                interview.scores.overall >= 8 ? 'text-green-400' :
                interview.scores.overall >= 5 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {interview.scores.overall}
              </span>
              <span className="text-2xl text-gray-500">/10</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Radar Chart Section */}
          <div className="lg:col-span-1 bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              Score Breakdown
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#4b5563' }} />
                  <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              {chartData.map(stat => (
                <div key={stat.subject} className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700/30">
                  <p className="text-xs text-gray-400 mb-1">{stat.subject}</p>
                  <p className="text-lg font-bold text-white">{stat.A}<span className="text-sm text-gray-500">/10</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Feedback Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Strengths */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Key Strengths
              </h3>
              <ul className="space-y-3">
                {interview.feedback.strengths.length > 0 ? (
                  interview.feedback.strengths.map((str, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No specific strengths recorded.</p>
                )}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Areas for Growth
              </h3>
              <ul className="space-y-3">
                {interview.feedback.weaknesses.length > 0 ? (
                  interview.feedback.weaknesses.map((weak, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span>{weak}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No specific weaknesses recorded.</p>
                )}
              </ul>
            </div>

            {/* Improvement Plan */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                Actionable Recommendations
              </h3>
              <ul className="space-y-3">
                {interview.feedback.improvements.length > 0 ? (
                  interview.feedback.improvements.map((imp, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No specific recommendations recorded.</p>
                )}
              </ul>
            </div>

          </div>
        </div>

        {/* Q&A Review */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-gray-400" />
            Interview Transcript
          </h2>
          
          <div className="space-y-8">
            {interview.questions.map((question, index) => (
              <div key={index} className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-gray-700/50">
                <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-4 border-[#0c1220]" />
                
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1 block">
                    Question {index + 1}
                  </span>
                  <p className="text-lg text-white font-medium">{question}</p>
                </div>
                
                <div className="bg-gray-800/60 rounded-xl p-5 border border-gray-700/50">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2 block">
                    Your Answer
                  </span>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {interview.answers[index] || <span className="italic text-gray-500">No answer provided.</span>}
                  </p>
                </div>
              </div>
            ))}
            
            {interview.questions.length === 0 && (
              <p className="text-gray-500 italic text-center py-8">Transcript data is not available for this session.</p>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
