import { apiClient } from "./apiClient";
import { Roadmap } from "./roadmapService";

export interface Enrollment {
  _id: string;
  userId: string;
  roadmapId: Roadmap; // Refers to the populated Roadmap object
  enrolledAt: string;
  progress: number;
  completedWeeks: number[];
  status: "active" | "completed";
  createdAt: string;
  updatedAt: string;
}

export class ClientEnrollmentService {
  /**
   * Enroll the logged-in user in a roadmap.
   */
  static async enrollRoadmap(roadmapId: string): Promise<Enrollment> {
    const response = await apiClient.post<{ success: boolean; data: Enrollment }>("/enrollments", {
      roadmapId
    });
    return response.data.data;
  }

  /**
   * Get all enrollments for the authenticated session user.
   */
  static async getMyEnrollments(): Promise<Enrollment[]> {
    const response = await apiClient.get<{ success: boolean; data: Enrollment[] }>("/enrollments/my");
    return response.data.data;
  }
}
