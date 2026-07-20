"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-hot-toast";
import { Loader2, Users, BookOpen, Brain, Target } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

interface AdminStats {
  totalUsers: number;
  totalRoadmaps: number;
  totalInterviews: number;
  totalQuizAttempts: number;
  totalCareerMatches: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: AdminStats }>("/admin/stats");
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load admin stats", err);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center text-secondary-text">
        Failed to load statistics.
      </div>
    );
  }

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Roadmaps", value: stats.totalRoadmaps },
    { name: "Interviews", value: stats.totalInterviews },
    { name: "Matches", value: stats.totalCareerMatches },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users Card */}
        <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-sm text-secondary-text">Total Users</h3>
          </div>
          <p className="text-2xl font-black text-dark-text mt-2">{stats.totalUsers.toLocaleString()}</p>
        </div>

        {/* Roadmaps Card */}
        <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="font-semibold text-sm text-secondary-text">Total Roadmaps</h3>
          </div>
          <p className="text-2xl font-black text-dark-text mt-2">{stats.totalRoadmaps.toLocaleString()}</p>
        </div>

        {/* Interviews Card */}
        <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Brain className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-sm text-secondary-text">Mock Interviews</h3>
          </div>
          <p className="text-2xl font-black text-dark-text mt-2">{stats.totalInterviews.toLocaleString()}</p>
        </div>

        {/* Matches Card */}
        <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Target className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="font-semibold text-sm text-secondary-text">Career Matches</h3>
          </div>
          <p className="text-2xl font-black text-dark-text mt-2">{stats.totalCareerMatches.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-dark-text mb-6">Platform Engagement</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                cursor={{ fill: '#334155', opacity: 0.1 }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
