import { useQuery } from "@tanstack/react-query";
import { ClientAchievementService } from "@/services/achievementService";

/**
 * Hook to retrieve user consistency streak parameters.
 */
export function useStreak(enabled: boolean = true) {
  return useQuery({
    queryKey: ["streak"],
    queryFn: () => ClientAchievementService.getStreak(),
    enabled,
    staleTime: 30000, // Cache streak details for 30s
    refetchOnWindowFocus: false,
  });
}
