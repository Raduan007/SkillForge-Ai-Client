"use client";

import React from "react";
import Link from "next/link";
import { useInterviews } from "@/hooks/useInterviews";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Brain, Star, TrendingUp, Clock, Plus, ChevronRight } from "lucide-react";

export default function InterviewsDashboardPage() {
  const { data: interviews, isLoading, error } = useInterviews();

  // Aggregate stats
  const totalInterviews = interviews?.length || 0;
  const averageScore = totalInterviews > 0
    ? Math.round(interviews!.reduce((acc, curr) => acc + curr.scores.overall, 0) / totalInterviews)
    : 0;
  const bestScore = totalInterviews > 0
    ? Math.max(...interviews!.map(i => i.scores.overall))
    : 0;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mock Interviews</h1>
            <p className="text-gray-400">Practice real-world technical interviews with our AI coach.</p>
          </div>
          <Link
            href="/dashboard/interviews/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Start New Interview
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Total Interviews</p>
                <p className="text-2xl font-bold text-white">{totalInterviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-white">{averageScore}/10</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Best Score</p>
                <p className="text-2xl font-bold text-white">{bestScore}/10</p>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Recent Interviews</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-800/50 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <p className="text-red-400">Failed to load interviews.</p>
            </div>
          ) : interviews?.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/20 border border-gray-800 rounded-2xl">
              <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No interviews yet</h3>
              <p className="text-gray-400 mb-6">Start your first mock interview to see your performance history here.</p>
              <Link
                href="/dashboard/interviews/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Start Practice <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews?.map((interview) => (
                <div key={interview._id} className="bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 transition-colors rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 rounded-lg">
                        {interview.category}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-lg">
                        {interview.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {new Date(interview.completionDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Score</p>
                      <p className={`text-xl font-bold ${
                        interview.scores.overall >= 8 ? 'text-green-400' :
                        interview.scores.overall >= 5 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {interview.scores.overall}/10
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/interviews/${interview._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium transition-colors"
                      title="View Report"
                    >
                      View Report
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
