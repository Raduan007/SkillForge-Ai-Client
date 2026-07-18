import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientEnrollmentService } from "@/services/enrollmentService";

/**
 * Hook to retrieve the active user's enrollments list.
 */
export function useMyEnrollments(enabled: boolean = true) {
  return useQuery({
    queryKey: ["my-enrollments"],
    queryFn: () => ClientEnrollmentService.getMyEnrollments(),
    enabled,
    staleTime: 5000 // 5 seconds fresh status
  });
}

/**
 * Hook to enroll the user in a roadmap.
 * Automatically invalidates current enrollments cache.
 */
export function useEnrollRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roadmapId: string) => ClientEnrollmentService.enrollRoadmap(roadmapId),
    onSuccess: () => {
      // Invalidate current enrollments list cache to force immediate refresh updates
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
    }
  });
}
