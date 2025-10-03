export interface User {
  email: string;
  name: string;
}

export type AuthResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
};
