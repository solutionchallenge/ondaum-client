import { create } from "zustand/react";

type User = {
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
  fetchUser: () => Promise<void>;
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
    fetchUser: async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/self`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user");
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  };
});
