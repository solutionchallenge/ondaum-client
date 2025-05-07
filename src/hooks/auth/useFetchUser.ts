import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchUser = (
  accessToken: string | null,
  refreshToken: string | null,
  onSuccess?: () => void
) => {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    fetch(`${API_BASE_URL}/user/self`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          logout();
          return null;
        }
        return res.json();
      })
      .then((user) => {
        if (!user) return;
        login(user, accessToken, refreshToken);
        if (onSuccess) onSuccess();
      });
  }, [accessToken, refreshToken, login, logout, onSuccess]);
};
