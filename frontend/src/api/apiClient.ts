
import { User } from "@/types/auth";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Base API URL
const API_URL = '/api';

// Headers for JSON requests
const jsonHeaders = {
  'Content-Type': 'application/json',
};

// Helper to add auth token to headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch wrapper with error handling
const fetchWithErrorHandling = async <T>(
  url: string, 
  options: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Clear token on unauthorized
        localStorage.removeItem('token');
      }
      
      const errorData = await response.json().catch(() => ({}));
      return { 
        data: null, 
        error: errorData.message || `Error: ${response.status}` 
      };
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Auth API
export const authApi = {
  signUp: async (email: string, password: string, fullName: string, phoneNumber: string) => {
    return fetchWithErrorHandling<{ token: string, user: User }>(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ email, password, fullName, phoneNumber }),
    });
  },
  
  signIn: async (email: string, password: string) => {
    return fetchWithErrorHandling<{ token: string, user: User }>(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ email, password }),
    });
  },
  
  getSession: async () => {
    return fetchWithErrorHandling<{ user: User }>(`${API_URL}/auth/session`, {
      headers: { ...jsonHeaders, ...getAuthHeaders() },
    });
  },
  
  signOut: async () => {
    localStorage.removeItem('token');
    return { data: true, error: null };
  }
};

// Health Info API
export const healthInfoApi = {
  getHealthInfo: async () => {
    return fetchWithErrorHandling(`${API_URL}/health-info`, {
      headers: { ...jsonHeaders, ...getAuthHeaders() },
    });
  },
  
  saveHealthInfo: async (healthInfo: any) => {
    return fetchWithErrorHandling(`${API_URL}/health-info`, {
      method: 'POST',
      headers: { ...jsonHeaders, ...getAuthHeaders() },
      body: JSON.stringify(healthInfo),
    });
  }
};

// Add other API clients as needed (checkout, dashboard, etc.)
