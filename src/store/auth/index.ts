import { create } from "zustand/react";

export type User = {
  id: number;
  email: string;
  username: string;
  privacy?: {
    birthday: string;
    gender: string;
  };
  addition?: {
    concerns: string[];
    emotions: string[];
  };
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
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
    setTokens: (accessToken, refreshToken) => {
      if (accessToken) localStorage.setItem("access_token", accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      set({ accessToken, refreshToken });
    },
  };
});
