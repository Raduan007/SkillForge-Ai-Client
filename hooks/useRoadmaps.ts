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
    staleTime: 30000, // 30 seconds cache fresh time
    refetchOnWindowFocus: false,
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
    staleTime: 60000, // 60 seconds cache fresh time
    refetchOnWindowFocus: false,
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
    staleTime: 60000, // 60 seconds cache fresh time
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to retrieve featured roadmaps from the server.
 */
export function useFeaturedRoadmaps() {
  return useQuery({
    queryKey: ["roadmaps-featured"],
    queryFn: () => ClientRoadmapService.getFeaturedRoadmaps(),
    staleTime: 120000, // 2 minutes cache fresh time
    refetchOnWindowFocus: false,
    retry: false, // don't retry on timeout \u2014 avoids doubling the 12s wait
  });
}

