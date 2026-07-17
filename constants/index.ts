/**
 * Centralized Static Constants for SkillForge AI
 */

// ==========================================
// 1. APPLICATION METADATA
// ==========================================
export const APP_METADATA = {
  NAME: "SkillForge AI",
  TAGLINE: "AI-Powered Career & Learning Roadmaps",
  DESCRIPTION:
    "Accelerate your career with customized, AI-generated learning roadmaps, interactive skill assessments, and personal AI career co-pilots.",
  VERSION: "1.0.0",
  SUPPORT_EMAIL: "support@skillforge.ai",
  COMPANY_NAME: "SkillForge AI Inc.",
} as const;

// ==========================================
// 2. CLIENT ROUTES
// ==========================================
export const APP_ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  QUIZ: "/quiz",
  GENERATOR: "/generator",
  ROADMAP_DETAIL: (id: string) => `/roadmap/${id}`,
} as const;

// ==========================================
// 3. API ROUTE ENDPOINTS
// ==========================================
export const API_ENDPOINTS = {
  PROFILE: "/profile",
  UPDATE_STREAK: "/profile/update-streak",
  ROADMAP_GENERATE: "/roadmap/generate",
  ROADMAP_DETAIL: (id: string) => `/roadmap/${id}`,
  ROADMAP_TOGGLE_NODE: (id: string) => `/roadmap/${id}/toggle-node`,
  QUIZ_CAREER_MATCH: "/quiz/career-match",
  QUIZ_CAREER_SUBMIT: "/quiz/career-match/submit",
  QUIZ_NODE_DETAIL: (nodeId: string) => `/quiz/node/${nodeId}`,
  QUIZ_NODE_SUBMIT: (nodeId: string) => `/quiz/node/${nodeId}/submit`,
  COPILOT_CHAT: "/copilot/chat",
} as const;

// ==========================================
// 4. PAGINATION DEFAULTS
// ==========================================
export const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50],
} as const;

// ==========================================
// 5. CLIENT STORAGE & THEME KEYS
// ==========================================
export const THEME_CONSTANTS = {
  THEMES: ["light", "dark"] as const,
  STORAGE_KEY: "skillforge-theme",
  DEFAULT_THEME: "light" as const,
} as const;

// ==========================================
// 6. CORE DESIGN SYSTEM COLORS (HEX VALUES)
// ==========================================
export const COLOR_CONSTANTS = {
  PRIMARY: "#2563EB", // Royal Blue
  SECONDARY: "#10B981", // Emerald Green
  BACKGROUND_LIGHT: "#F8FAFC",
  BACKGROUND_DARK: "#090D16",
  TEXT_DARK: "#0F172A",
  TEXT_MUTED: "#64748B",
  BORDER: "#E2E8F0",
} as const;

// ==========================================
// 7. CHART VISUAL PALETTES (HEX VALUES)
// ==========================================
export const CHART_COLORS = {
  PRIMARY: "#2563EB", // Royal Blue (Progress tracks)
  SECONDARY: "#10B981", // Emerald Green (Success spikes)
  WARNING: "#F59E0B", // Amber Yellow (Streaks)
  ERROR: "#EF4444", // Red warning (Fails)
  INFO: "#0EA5E9", // Sky Blue (Reference items)
  GRID_BORDER: "#E2E8F0", // Grid delimiter borders
  GRID_BORDER_DARK: "#1E293B",
} as const;

// ==========================================
// 8. DATA VALIDATION BOUNDS
// ==========================================
export const VALIDATION_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 64,
  MAX_FILE_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
} as const;
