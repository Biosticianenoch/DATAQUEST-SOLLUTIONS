import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, getRolePermissions } from './roles';
import { authAPI } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions?: {
    canManageUsers: boolean;
    canViewAllProfiles: boolean;
    canManagePlatform: boolean;
    canAccessClientFeatures: boolean;
    canAccessStudentFeatures: boolean;
    canManageOwnProfile: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user on mount if token exists
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // Verify the role is valid
            if (!Object.values(UserRole).includes(parsedUser.role)) {
              throw new Error('Invalid user role');
            }
            // Add permissions based on role
            const userWithPermissions = {
              ...parsedUser,
              permissions: getRolePermissions(parsedUser.role)
            };
            setUser(userWithPermissions);
          } catch (err) {
            console.error('Error parsing stored user:', err);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err: any) {
        setUser(null);
        setError(err?.response?.data?.error || err.message || 'Failed to fetch user');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password, role);
      const { token, user } = response.data;
      
      // Ensure the role is set correctly
      const userWithRole = {
        ...user,
        role: role // Explicitly set the role from the login request
      };
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithRole));
      
      // Set user in context with permissions
      const userWithPermissions = {
        ...userWithRole,
        permissions: getRolePermissions(role)
      };
      setUser(userWithPermissions);
      setError(null);
      
      // Redirect based on role
      if (role === UserRole.ADMIN) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/courses';
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || 'Login failed';
      const errorDetails = err?.response?.data?.details;
      setError(errorMessage);
      throw new Error(errorDetails || errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Validate role
      if (!Object.values(UserRole).includes(userData.role)) {
        throw new Error('Invalid role selected');
      }

      // Allow admin registration only for specific email
      if (userData.role === UserRole.ADMIN && userData.email !== 'dataquestsolutions2@gmail.com') {
        throw new Error('Cannot register as admin');
      }

      await authAPI.register(userData);
      // Don't auto-login, just complete registration
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};