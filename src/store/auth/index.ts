import { create } from "zustand/react";

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const savedUser = localStorage.getItem("user");
  const savedAccessToken = localStorage.getItem("access_token");
  const savedRefreshToken = localStorage.getItem("refresh_token");

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    accessToken: savedAccessToken || null,
    refreshToken: savedRefreshToken || null,
    isLoggedIn: !!savedUser && !!savedAccessToken,
    login: (user, accessToken, refreshToken) => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      set({ user, accessToken, refreshToken, isLoggedIn: true });
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false,
      });
    },
  };
});
