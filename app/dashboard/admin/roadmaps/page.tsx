"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Roadmap {
  _id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
}

export default function AdminRoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchRoadmaps = async () => {
    try {
      const response = await apiClient.get<{ success: boolean; data: { roadmaps: Roadmap[] } }>("/roadmaps");
      // Since our API currently returns data nested or paginated, we handle it flexibly
      // Depending on actual response structure from RoadmapService.getRoadmaps:
      if (response.data?.data?.roadmaps) {
        setRoadmaps(response.data.data.roadmaps);
      } else if (response.data && (response.data as any).roadmaps) {
        setRoadmaps((response.data as any).roadmaps);
      } else if (Array.isArray(response.data)) {
        setRoadmaps(response.data);
      }
    } catch (err) {
      console.error("Failed to load roadmaps", err);
      toast.error("Failed to load roadmaps list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this roadmap? This action cannot be undone.")) return;

    setActionLoadingId(id);
    const loadingId = toast.loading("Deleting roadmap...");
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/roadmaps/${id}`);
      if (response.data.success) {
        toast.success("Roadmap deleted successfully.", { id: loadingId });
        setRoadmaps((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete roadmap", err);
      toast.error("Failed to delete roadmap", { id: loadingId });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Roadmap Management
        </h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Roadmap</span>
        </Button>
      </div>

      <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-[#090d16]/50 text-secondary-text text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color dark:divide-slate-800/60">
                {roadmaps.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-secondary-text">
                      No roadmaps found.
                    </td>
                  </tr>
                ) : (
                  roadmaps.map((roadmap) => (
                    <tr key={roadmap._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-dark-text">{roadmap.title}</span>
                          <span className="text-xs text-secondary-text">Slug: {roadmap.slug}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-secondary-text">{roadmap.category}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-secondary-text">
                          {roadmap.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-1.5 rounded-lg text-secondary-text hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
                            title="Edit Roadmap (Coming Soon)"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(roadmap._id)}
                            disabled={actionLoadingId === roadmap._id}
                            title="Delete Roadmap"
                            className="p-1.5 rounded-lg text-secondary-text hover:bg-red-500/10 hover:text-red-500 transition-colors disabled:opacity-50 ml-1"
                          >
                            {actionLoadingId === roadmap._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
