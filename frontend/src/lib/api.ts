import axios, { AxiosError, AxiosResponse } from 'axios';

// Types and Interfaces
interface UserData {
  name: string;
  email: string;
  password: string;
  role?: string;
  company?: string;
  position?: string;
  phone?: string;
}

interface UserUpdateData {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  company?: string;
  position?: string;
  phone?: string;
}

interface SearchParams {
  query?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface BulkOperationData {
  status?: string;
  role?: string;
  permissions?: string[];
}

interface AnalyticsParams {
  period?: 'day' | 'week' | 'month' | 'year';
  startDate?: string;
  endDate?: string;
}

interface AdminSettings {
  security?: {
    passwordPolicy?: {
      minLength?: number;
      requireSpecialChars?: boolean;
      requireNumbers?: boolean;
    };
    sessionTimeout?: number;
    maxLoginAttempts?: number;
  };
  email?: {
    smtpServer?: string;
    smtpPort?: number;
    senderEmail?: string;
  };
  notifications?: {
    emailNotifications?: boolean;
    systemAlerts?: boolean;
  };
}

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        config.headers['X-User-Role'] = parsedUser.role;
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Log error details
      console.error('API Error:', {
        status,
        data,
        url: error.config?.url,
        method: error.config?.method,
      });

      // Handle specific error cases
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden - show access denied message
          console.error('Access denied:', data?.message || 'You do not have permission to access this resource');
          // Don't redirect on 403, let the component handle it
          break;
        case 404:
          // Not found - log resource not found
          console.error('Resource not found:', error.config?.url);
          break;
        case 500:
          // Server error - log internal server error
          console.error('Internal server error:', data?.message || 'An unexpected error occurred');
          break;
        default:
          // Handle other errors
          console.error('API error:', status, data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server. Please check if the server is running.');
      // Clear auth data if server is not responding
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string, role: string) => {
    try {
      const response = await api.post('/users/login', { email, password, role });
      // Store token and user data
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  },
  
  register: async (userData: UserData) => {
    try {
      const response = await api.post('/users/signup', userData);
      return response;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject(new Error('No token found'));
    }
    try {
      const response = await api.get('/users/me');
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  }
};

// User API
export const userAPI = {
  getUsers: () => 
    api.get('/users'),
  
  getUser: (id: string) => 
    api.get(`/users/${id}`),
  
  createUser: (userData: UserData) => 
    api.post('/users', userData),
  
  updateUser: (id: string, userData: UserUpdateData) => 
    api.patch(`/users/${id}`, userData),
  
  deleteUser: (id: string) => 
    api.delete(`/users/${id}`),
  
  searchUsers: (params: SearchParams) => 
    api.get('/admin/users/search', { params }),
  
  bulkUserOperation: (operation: string, userIds: string[], data?: BulkOperationData) => 
    api.post('/admin/users/bulk', { operation, userIds, data }),
  
  exportUsers: (format: string = 'json') => 
    api.get('/admin/users/export', { params: { format } })
};

// Analytics API
export const analyticsAPI = {
  getStats: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/stats');
  },
  
  getActivity: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/activity');
  },
  
  getGrowth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/growth');
  },
  
  getActivityByRole: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/activity-by-role');
  },
  
  getRegistrationTrends: (period: string = 'month') => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/registration-trends', { params: { period } });
  },
  
  getPerformance: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/performance');
  },
  
  getErrors: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return Promise.reject(new Error('No authentication data found'));
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        return Promise.reject(new Error('Admin access required'));
      }
    } catch (err) {
      return Promise.reject(new Error('Invalid user data'));
    }
    
    return api.get('/analytics/errors');
  }
};

// Admin API
export const adminAPI = {
  getSettings: () => 
    api.get('/admin/settings'),
  
  updateSettings: (settings: AdminSettings) => 
    api.patch('/admin/settings', settings),
  
  getLogs: (type: string = 'all', limit: number = 50) => 
    api.get('/admin/logs', { params: { type, limit } })
};

// Search API
export const searchAPI = {
  search: (query: string) => 
    api.get(`/search?q=${encodeURIComponent(query)}`),
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Failed to connect to server');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem(import.meta.env.VITE_USER_DATA_KEY);
  window.location.href = '/login';
};

export default api; 