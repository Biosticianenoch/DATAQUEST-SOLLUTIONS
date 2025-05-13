// API configuration
export const API_BASE_URL = import.meta.env.PROD
  ? '/api'  // In production, use relative path
  : 'http://localhost:3001/api';

// Other configuration constants can be added here
export const APP_NAME = 'DataQuest Solutions';
export const APP_VERSION = '1.0.0'; 