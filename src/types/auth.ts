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