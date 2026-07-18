import { apiClient } from "./apiClient";

export interface Roadmap {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  totalRatings: number;
  skills: string[];
  learningOutcomes: string[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetRoadmapsResponse {
  roadmaps: Roadmap[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface GetRoadmapsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  difficulty?: string;
  sort?: string;
}

export class ClientRoadmapService {
  /**
   * Fetch all published, paginated, filtered roadmaps from MongoDB.
   */
  static async getRoadmaps(query: GetRoadmapsQuery): Promise<GetRoadmapsResponse> {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.search) params.append("search", query.search);
    if (query.category) params.append("category", query.category);
    if (query.difficulty) params.append("difficulty", query.difficulty);
    if (query.sort) params.append("sort", query.sort);

    const response = await apiClient.get<GetRoadmapsResponse>(`/roadmaps?${params.toString()}`);
    return response.data;
  }

  /**
   * Fetch single published roadmap by its unique slug identifier from MongoDB.
   */
  static async getRoadmapBySlug(slug: string): Promise<Roadmap> {
    const response = await apiClient.get<Roadmap>(`/roadmaps/${slug}`);
    return response.data;
  }

  /**
   * Fetch single roadmap by its ID from MongoDB.
   */
  static async getRoadmapById(id: string): Promise<Roadmap> {
    const response = await apiClient.get<Roadmap>(`/roadmaps/${id}`);
    return response.data;
  }
}
