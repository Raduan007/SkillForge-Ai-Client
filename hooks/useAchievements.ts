import { useQuery } from "@tanstack/react-query";
import { ClientAchievementService } from "@/services/achievementService";

/**
 * Hook to retrieve user achievements feed.
 */
export function useAchievements(enabled: boolean = true) {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: () => ClientAchievementService.getAchievements(),
    enabled,
    staleTime: 30000, // Cache achievements for 30s
    refetchOnWindowFocus: false,
  });
}
