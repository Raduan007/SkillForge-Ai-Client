import { apiClient } from "./apiClient";

export interface Achievement {
  type: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
  progressPercentage: number;
  progressDisplay: string;
}

export interface Streak {
  _id: string;
  userId: string;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  createdAt: string;
  updatedAt: string;
}

export class ClientAchievementService {
  /**
   * Fetch all achievements for the user (locked + unlocked).
   */
  static async getAchievements(): Promise<Achievement[]> {
    const response = await apiClient.get<{ success: boolean; data: Achievement[] }>("/achievements");
    return response.data.data;
  }

  /**
   * Fetch user learning streak metrics.
   */
  static async getStreak(): Promise<Streak> {
    const response = await apiClient.get<{ success: boolean; data: Streak }>("/streak");
    return response.data.data;
  }
}
