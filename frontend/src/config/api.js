// API Configuration
// Use environment variable in production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register/`,
    LOGIN: `${API_BASE_URL}/api/auth/login/`,
    ME: `${API_BASE_URL}/api/auth/me/`,
    PROFILE: `${API_BASE_URL}/api/auth/profile/`,
  },
  ASSESSMENTS: {
    SUBMIT: `${API_BASE_URL}/api/assessments/submit/`,
    HISTORY: `${API_BASE_URL}/api/assessments/history/`,
    DETAIL: (id) => `${API_BASE_URL}/api/assessments/${id}/`,
  },
  QUESTIONS: `${API_BASE_URL}/api/questions/`,
  CAREERS: `${API_BASE_URL}/api/careers/`,
  ADMIN: {
    STATS: `${API_BASE_URL}/api/admin/stats/`,
  },
  ADMIN_URL: `${API_BASE_URL}/admin/`,
};

export default API_BASE_URL;