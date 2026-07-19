import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientInterviewService } from "../services/interviewService";
import toast from "react-hot-toast";

export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: ClientInterviewService.getInterviews,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSaveInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ClientInterviewService.saveInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
      toast.success("Interview session saved!");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Failed to save interview session";
      toast.error(msg);
    },
  });
};
