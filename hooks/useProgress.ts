import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientProgressService, Progress } from "@/services/progressService";

/**
 * Hook to retrieve progress data for a specific roadmap pathway.
 */
export function useProgress(roadmapIdOrSlug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["progress", roadmapIdOrSlug],
    queryFn: () => ClientProgressService.getProgress(roadmapIdOrSlug),
    enabled: !!roadmapIdOrSlug && enabled,
    staleTime: 30000, // 30 seconds cache fresh status
    refetchOnWindowFocus: false,
  });
}

/**
 * Mutation hook to toggle roadmap node completions.
 * Features optimistic UI updates.
 */
export function useUpdateProgress(roadmapIdOrSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (completedNodes: string[]) => 
      ClientProgressService.updateProgress(roadmapIdOrSlug, completedNodes),
    
    // Optimistic UI updates
    onMutate: async (completedNodes) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic state
      await queryClient.cancelQueries({ queryKey: ["progress", roadmapIdOrSlug] });

      // Snapshot the previous progress state
      const previousProgress = queryClient.getQueryData<Progress>(["progress", roadmapIdOrSlug]);

      // Optimistically update to the new nodes list
      if (previousProgress) {
        queryClient.setQueryData<Progress>(["progress", roadmapIdOrSlug], {
          ...previousProgress,
          completedNodes,
          // Calculate an approximate progress rate if possible (or keep previous until server responds)
        });
      }

      return { previousProgress };
    },

    // Rollback to snapshot on failure
    onError: (err, variables, context) => {
      if (context?.previousProgress) {
        queryClient.setQueryData(["progress", roadmapIdOrSlug], context.previousProgress);
      }
    },

    // Always invalidate after success or error to sync database state
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", roadmapIdOrSlug] });
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
    }
  });
}
