"use client";

import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store";
import { authService } from "@/services/auth";
import type { User } from "@/types";

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authService.login({ email, password });
      const { user: rawUser, token } = response.data.data;
      const user: User = {
        ...rawUser,
        role: rawUser.role as User["role"],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setAuth(user, token);
      return response.data;
    },
    [setAuth]
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string,
      role: "candidate" | "employer"
    ) => {
      const response = await authService.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });
      const { user: rawUser, token } = response.data.data;
      const user: User = {
        ...rawUser,
        role: rawUser.role as User["role"],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setAuth(user, token);
      return response.data;
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    if (token) {
      authService.me().catch(() => {
        clearAuth();
      });
    }
  }, [token, clearAuth]);

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
