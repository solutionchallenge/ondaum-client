import { useEffect, useState } from "react";
import { useAuthStore, User } from "../../store/auth/index";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchUser = (
  accessToken: string | null,
  refreshToken: string | null,
  onSuccess?: () => void
) => {
  const { login, logout } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);

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
        login(user as User, accessToken, refreshToken);
        setUser(user);
        if (onSuccess) onSuccess();
      });
  }, [accessToken, refreshToken, login, logout, onSuccess]);

  return { user };
};
