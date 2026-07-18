"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useRoadmaps } from "@/hooks/useRoadmaps";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { SkeletonTable, ErrorState, EmptyData } from "@/components/ui/States";
import { DeleteModal } from "@/components/ui/Modals";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { Compass, Trash2, Eye, Star, Plus } from "lucide-react";
import { cn } from "@/utils/cn";

export default function ManageItemsPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // ─── Route Protection ───────────────────────────────────────────────────────

  React.useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("Please sign in to access the management panel.");
      router.push("/login?redirect=/items/manage");
    }
  }, [user, isAuthLoading, router]);

  // ─── Query Data ─────────────────────────────────────────────────────────────

  // Fetch with high limit to list all roadmaps in manage panel
  const { data, isLoading: isDataLoading, isError, refetch } = useRoadmaps({
    page: 1,
    limit: 50,
  });

  const roadmaps = data?.roadmaps || [];

  const queryClient = useQueryClient();

  // Deletion tracking states
  const [roadmapToDelete, setRoadmapToDelete] = React.useState<{ id: string; title: string } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDeletingInProgress, setIsDeletingInProgress] = React.useState(false);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleDeleteClick = (id: string, title: string) => {
    setRoadmapToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roadmapToDelete) return;
    setIsDeletingInProgress(true);
    const loadingToastId = toast.loading(`Deleting "${roadmapToDelete.title}"...`);

    try {
      const response = await apiClient.delete<{
        success: boolean;
        message?: string;
        data?: unknown;
      }>(`/roadmaps/${roadmapToDelete.id}`);

      if (response.data?.success) {
        toast.success(`Successfully deleted "${roadmapToDelete.title}"`, { id: loadingToastId });
        queryClient.invalidateQueries({ queryKey: ["roadmaps"] });
        setIsDeleteModalOpen(false);
        setRoadmapToDelete(null);
      } else {
        toast.error("Failed to delete the roadmap item.", { id: loadingToastId });
      }
    } catch (err: unknown) {
      console.error("[DeleteRoadmap] Error:", err);
      let errorMsg = "An unexpected error occurred while deleting.";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          errorMsg = axiosError.response.data.error;
        }
      }
      toast.error(errorMsg, { id: loadingToastId });
    } finally {
      setIsDeletingInProgress(false);
    }
  };

  // Centered spinner loader during session check
  if (isAuthLoading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="flex flex-col items-center gap-3">
          <Compass className="h-10 w-10 text-primary animate-spin" />
          <span className="text-sm font-semibold text-secondary-text">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#090d16] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Manage Career Roadmaps
            </h1>
            <p className="mt-2 text-sm text-secondary-text max-w-xl">
              Inspect database items, view detailed paths, add new configurations, or delete existing entries.
            </p>
          </div>
          <Link href="/items/add" className="shrink-0">
            <Button variant="primary" size="medium" className="text-xs font-bold gap-2">
              <Plus className="h-4 w-4" />
              Add New Roadmap
            </Button>
          </Link>
        </div>

        {/* Content Render States */}
        {isDataLoading ? (
          <div className="bg-white dark:bg-[#0c1220] p-6 rounded-xl border border-border-color dark:border-slate-800/50">
            <SkeletonTable rows={5} />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : roadmaps.length === 0 ? (
          <EmptyData
            title="No roadmaps configured"
            description="Your MongoDB database does not contain any roadmap records yet. Let's create your first path."
            actionLabel="Add Roadmap"
            onAction={() => router.push("/items/add")}
          />
        ) : (
          <>
            {/* Desktop Table View Layout (md and above) */}
            <div className="hidden md:block overflow-hidden bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-color dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 font-semibold text-xs select-none">
                    <th className="py-4 px-6">Preview</th>
                    <th className="py-4 px-6">Roadmap Title</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Difficulty</th>
                    <th className="py-4 px-6">Duration</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 text-sm">
                  {roadmaps.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors">
                      
                      {/* Image Preview */}
                      <td className="py-4 px-6">
                        <div className="h-10 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-border-color dark:border-slate-800 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-6 font-bold text-dark-text max-w-xs truncate">
                        {item.title}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-xs font-semibold text-secondary-text">
                        {item.category}
                      </td>

                      {/* Difficulty Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={cn(
                            "inline-flex px-2.5 py-0.5 rounded-full text-xxs font-bold select-none border",
                            item.difficulty === "Beginner" && "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-250/20",
                            item.difficulty === "Intermediate" && "bg-indigo-50 dark:bg-indigo-950/20 text-primary-light border-primary/10",
                            item.difficulty === "Advanced" && "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-250/20"
                          )}
                        >
                          {item.difficulty}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-6 text-xs text-secondary-text font-semibold">
                        {item.duration}
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          <span className="text-xs font-bold text-dark-text">{item.rating.toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex justify-center items-center gap-3">
                          <Link href={`/items/manage/${item._id}`}>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg border border-border-color dark:border-slate-800 text-secondary-text hover:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-all"
                              title="View Roadmap"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(item._id, item.title)}
                            className="p-1.5 rounded-lg border border-red-200/55 dark:border-red-950/40 text-red-500 hover:text-red-700 hover:bg-red-50/20 transition-all"
                            title="Delete Item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View Layout (below md) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {roadmaps.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-xl p-5 flex flex-col gap-4 shadow-sm"
                >
                  
                  {/* Top card segment (Image + Title + Difficulty) */}
                  <div className="flex gap-4">
                    <div className="h-16 w-24 rounded-lg bg-slate-100 dark:bg-slate-800 border border-border-color dark:border-slate-800 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <span className="text-xs font-semibold text-secondary-text leading-none">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-dark-text text-sm leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className={cn(
                            "inline-flex px-2 py-0.5 rounded-full text-xxs font-bold select-none border",
                            item.difficulty === "Beginner" && "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-250/20",
                            item.difficulty === "Intermediate" && "bg-indigo-50 dark:bg-indigo-950/20 text-primary-light border-primary/10",
                            item.difficulty === "Advanced" && "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-250/20"
                          )}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mid card segment (Duration & Rating) */}
                  <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20 border-y border-border-color/60 dark:border-slate-850/50 py-2.5 px-3 rounded-lg text-xs font-semibold select-none">
                    <div className="text-secondary-text">
                      Duration: <span className="text-dark-text ml-1">{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-dark-text">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Bottom card segment (Actions) */}
                  <div className="flex gap-3">
                    <Link href={`/items/manage/${item._id}`} className="flex-1">
                      <Button variant="outline" size="medium" className="w-full text-xs font-semibold gap-1.5">
                        <Eye className="h-4 w-4" />
                        View Page
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      size="medium"
                      onClick={() => handleDeleteClick(item._id, item.title)}
                      className="border border-red-200/55 dark:border-red-950/40 text-red-500 hover:text-red-700 hover:bg-red-55/10 text-xs font-semibold px-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* Confirmation Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setRoadmapToDelete(null);
        }}
        onDelete={handleDeleteConfirm}
        isDeleting={isDeletingInProgress}
        title="Delete Career Roadmap"
        description={`Are you sure you want to permanently delete "${roadmapToDelete?.title}"? This action cannot be undone.`}
        deleteLabel="Delete Roadmap"
      />
    </div>
  );
}
