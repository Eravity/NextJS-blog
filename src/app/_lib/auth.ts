// Authentication helper for Grindly API
'use client';

export interface User {
  _id: string;
  username: string;
  email: string;
  gamification: {
    xp: number;
    level: number;
    coins: number;
    streakCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// Get the base API URL
const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
};

// Auth token management
export const authHelpers = {
  // Store token in localStorage
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Remove token from localStorage
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authHelpers.getToken();
  },

  // Login function
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(errorData.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    
    if (data.success && data.data.token) {
      authHelpers.setToken(data.data.token);
    }

    return data;
  },

  // Register function
  register: async (username: string, email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  },

  // Logout function
  logout: () => {
    authHelpers.removeToken();
    // Optionally redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
};
