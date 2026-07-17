import * as React from "react";

// ==========================================
// 1. GENERIC API RESPONSE TYPES
// ==========================================
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface SuccessResponse {
  success: boolean;
  message?: string;
  timestamp: string;
}

// ==========================================
// 2. PAGINATION SCHEMA
// ==========================================
export interface PaginationMetadata {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMetadata;
}

// ==========================================
// 3. USER & AUTH SPECIFICATIONS
// ==========================================
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "student" | "admin" | "instructor";
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // unix timestamp in ms
}

// ==========================================
// 4. CLIENT UI & LOADING STATES
// ==========================================
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface UIErrorState {
  hasError: boolean;
  message: string;
  code?: string;
  statusCode?: number;
}

// ==========================================
// 5. FORM ERROR SPECIFICATIONS
// ==========================================
export type FormErrors = Record<string, string>;

// ==========================================
// 6. GENERIC TABLE INTERFACES
// ==========================================
export interface ColumnDefinition<T> {
  header: string;
  accessorKey: keyof T | string;
  cellRenderer?: (row: T, index: number) => React.ReactNode;
  width?: string;
  className?: string;
}

export interface TableData<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
}

// ==========================================
// 7. GENERIC CARD SCHEMAS
// ==========================================
export interface GenericCardProps<T> {
  data: T;
  onSelect?: (data: T) => void;
  className?: string;
  isLoading?: boolean;
}
