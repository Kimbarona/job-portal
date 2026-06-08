import api from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: "candidate" | "employer";
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
    token: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ data: AuthResponse }> {
    return api.post("/auth/login", credentials);
  },

  async register(data: RegisterData): Promise<{ data: AuthResponse }> {
    return api.post("/auth/register", data);
  },

  async logout(): Promise<void> {
    return api.post("/auth/logout");
  },

  async me(): Promise<{ data: AuthResponse }> {
    return api.get("/auth/me");
  },
};
