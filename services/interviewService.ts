import { apiClient } from "./apiClient";

export interface InterviewScore {
  technicalAccuracy: number;
  problemSolving: number;
  communication: number;
  depth: number;
  overall: number;
}

export interface InterviewFeedback {
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
}

export interface InterviewSession {
  _id: string;
  userId: string;
  category: string;
  difficulty: string;
  questions: string[];
  answers: string[];
  scores: InterviewScore;
  feedback: InterviewFeedback;
  completionDate: string;
}

export interface InterviewHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MockInterviewTurnResponse {
  feedback: string;
  nextQuestion: string;
}

export interface MockInterviewFinalResponse {
  scores: InterviewScore;
  feedback: InterviewFeedback;
}

export const ClientInterviewService = {
  getInterviews: async (): Promise<InterviewSession[]> => {
    const response = await apiClient.get("/interviews");
    return response.data.data;
  },

  saveInterview: async (sessionData: Omit<InterviewSession, "_id" | "userId" | "completionDate">): Promise<InterviewSession> => {
    const response = await apiClient.post("/interviews", sessionData);
    return response.data.data;
  },

  conductMockInterviewTurn: async (
    category: string,
    difficulty: string,
    messageHistory: InterviewHistoryMessage[]
  ): Promise<MockInterviewTurnResponse> => {
    const response = await apiClient.post("/ai/mock-interview", {
      category,
      difficulty,
      messageHistory,
      isFinalTurn: false,
    });
    return response.data.data;
  },

  conductMockInterviewFinal: async (
    category: string,
    difficulty: string,
    messageHistory: InterviewHistoryMessage[]
  ): Promise<MockInterviewFinalResponse> => {
    const response = await apiClient.post("/ai/mock-interview", {
      category,
      difficulty,
      messageHistory,
      isFinalTurn: true,
    });
    return response.data.data;
  },
};
