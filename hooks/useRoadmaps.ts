import { useQuery } from "@tanstack/react-query";
import { ClientRoadmapService, GetRoadmapsQuery } from "@/services/roadmapService";

/**
 * Hook to retrieve paginated, filtered, and sorted roadmaps list from the server using TanStack Query.
 */
export function useRoadmaps(query: GetRoadmapsQuery) {
  return useQuery({
    queryKey: ["roadmaps", query],
    queryFn: () => ClientRoadmapService.getRoadmaps(query),
    placeholderData: (previousData) => previousData, // keep previous data for paginated transitions
    staleTime: 5000, // 5 seconds fresh status
  });
}

/**
 * Hook to retrieve a single roadmap by its unique slug identifier.
 */
export function useRoadmapBySlug(slug: string) {
  return useQuery({
    queryKey: ["roadmap", slug],
    queryFn: () => ClientRoadmapService.getRoadmapBySlug(slug),
    enabled: !!slug,
    staleTime: 10000, // 10 seconds fresh status
  });
}

/**
 * Hook to retrieve a single roadmap by its ID.
 */
export function useRoadmapById(id: string) {
  return useQuery({
    queryKey: ["roadmap-id", id],
    queryFn: () => ClientRoadmapService.getRoadmapById(id),
    enabled: !!id,
    staleTime: 10000, // 10 seconds fresh status
  });
}
