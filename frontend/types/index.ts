export interface User {
  id: number;
  name: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  company_id: number;
  title: string;
  slug: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  location: string;
  type: string;
  category: string;
  salary_min?: number;
  salary_max?: number;
  currency: string;
  is_active: boolean;
  expires_at?: string;
  company?: Company;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: number;
  user_id: number;
  phone?: string;
  address?: string;
  resume?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface Employer {
  id: number;
  user_id: number;
  company_id: number;
  position?: string;
  user?: User;
  company?: Company;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job_id: number;
  candidate_id: number;
  status: string;
  cover_letter?: string;
  resume?: string;
  job?: Job;
  candidate?: Candidate;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
