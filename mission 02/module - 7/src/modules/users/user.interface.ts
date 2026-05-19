export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  is_active?: boolean;
  age: number;
  created_at?: string;
  updated_at?: string;
}
