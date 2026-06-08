import api from "./api";

interface HealthResponse {
  success: boolean;
  message: string;
  data: {
    status: string;
  };
}

export const healthService = {
  async check(): Promise<{ data: HealthResponse }> {
    return api.get("/health");
  },
};
