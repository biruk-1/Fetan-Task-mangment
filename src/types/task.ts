export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in_progress';
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreate {
  title: string;
  status?: 'pending' | 'completed' | 'in_progress';
  completed?: boolean;
}

export interface TaskUpdate {
  title?: string;
  status?: 'pending' | 'completed' | 'in_progress';
  completed?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 