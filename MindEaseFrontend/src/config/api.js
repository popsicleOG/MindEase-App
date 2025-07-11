// API Configuration
// This file centralizes all API endpoints and base URLs

const API_CONFIG = {
  // Development
  development: {
    baseURL: 'http://localhost:5000',
    timeout: 10000,
  },
  
  // Production (update with your actual production URL)
  production: {
    baseURL: 'https://your-production-api.com',
    timeout: 15000,
  },
  
  // Test
  test: {
    baseURL: 'http://localhost:5000',
    timeout: 5000,
  }
};

// Get current environment
const getEnvironment = () => {
  if (__DEV__) {
    return 'development';
  }
  // Add logic to detect production vs test
  return 'development';
};

// Export current config
const currentConfig = API_CONFIG[getEnvironment()];

export const API_BASE_URL = currentConfig.baseURL;
export const API_TIMEOUT = currentConfig.timeout;

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: '/auth',
  REGISTER: '/register',
  LOGIN: '/login',
  
  // User Management
  USER_PROFILE: '/user',
  HEALTH_CHECK: '/health',
  
  // Mood Tracking
  MOOD_LOG: '/mood',
  MOOD_HISTORY: '/mood/history',
  MOOD_DELETE: (id) => `/mood/${id}`,
  
  // Goals & Suggestions
  GOALS: '/goals',
  GOAL_FEEDBACK: (id) => `/goals/${id}/feedback`,
  GOAL_COMPLETE: (id) => `/goals/${id}/complete`,
  GOAL_DELETE: (id) => `/goals/${id}`,
  GOAL_STATS: '/goals/stats',
  
  // Payments
  CHECKOUT_SESSION: '/payment/create-checkout-session',
  PORTAL_SESSION: '/payment/create-portal-session',
  CANCEL_SUBSCRIPTION: '/payment/cancel-subscription',
  PAYMENT_WEBHOOK: '/payment/webhook',
};

// Helper function to build full URLs
export const buildURL = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function to get API headers with auth
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export default {
  API_BASE_URL,
  API_TIMEOUT,
  ENDPOINTS,
  buildURL,
  getAuthHeaders,
}; 