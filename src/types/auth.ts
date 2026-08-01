import type { Role } from './common';
import type { Session } from 'next-auth';

export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type SessionUser = Pick<User, 'id' | 'email' | 'name' | 'role'>;

export type ApiUser = Pick<User, 'id' | 'email' | 'name'>;

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: ApiUser;
}

export interface AuthState {
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}
