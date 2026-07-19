import { apiClient } from "./apiClient";

export interface Progress {
  _id: string;
  userId: string;
  roadmapId: string;
  completedNodes: string[];
  progressPercentage: number;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export class ClientProgressService {
  /**
   * Fetch active user progress for a specific roadmap pathway slug or ID.
   */
  static async getProgress(roadmapIdOrSlug: string): Promise<Progress> {
    const response = await apiClient.get<{ success: boolean; data: Progress }>(`/progress/${roadmapIdOrSlug}`);
    return response.data.data;
  }

  /**
   * Update user completed nodes list.
   */
  static async updateProgress(roadmapIdOrSlug: string, completedNodes: string[]): Promise<Progress> {
    const response = await apiClient.patch<{ success: boolean; data: Progress }>(
      `/progress/${roadmapIdOrSlug}`,
      { completedNodes }
    );
    return response.data.data;
  }
}
