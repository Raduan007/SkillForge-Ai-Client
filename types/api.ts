/**
 * Shared Type Definitions for SkillForge AI API Transactions
 */

export interface BaseApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface CareerRecommendation {
  career: string;
  matchPercentage: number;
  description: string;
}

export interface UserProfile {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  streak: number;
  lastActive: string;
  completedNodes: string[];
  badges: string[];
  recommendedCareers: CareerRecommendation[];
  activeRoadmapId?: string;
}

export interface ResourceItem {
  title: string;
  url: string;
  type: "article" | "video" | "course";
}

export interface NodeProject {
  title: string;
  description: string;
}

export interface RoadmapNode {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  topics: string[];
  resources: ResourceItem[];
  project: NodeProject;
}

export interface RoadmapStage {
  id: string;
  name: string;
  description: string;
  nodes: RoadmapNode[];
}

export interface Roadmap {
  id: string;
  title: string;
  career: string;
  level: string;
  style: string;
  hoursPerWeek: number;
  goal: string;
  createdAt: string;
  estimatedWeeks: number;
  stages: RoadmapStage[];
  completedNodes: string[];
}

export interface QuizQuestionOption {
  text: string;
  career?: string; // Mapped career for onboarding questions
}

export interface CareerQuizQuestion {
  id: string;
  question: string;
  options: QuizQuestionOption[];
}

export interface SkillQuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex?: number; // Kept optional on client responses
}

export interface QuizSubmissionResult {
  passed: boolean;
  scorePercentage: number;
  correctCount: number;
  totalQuestions: number;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatRequest {
  message: string;
  currentNodeId?: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}
