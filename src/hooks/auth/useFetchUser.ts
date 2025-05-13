import type { User } from "../../store/auth";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth/index";
import { getUserInfo } from "../../api/auth/login";

export const useFetchUser = (
  accessToken: string | null,
  refreshToken: string | null,
  onSuccess?: () => void
) => {
  const { login, logout } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    getUserInfo().then((user) => {
      if (!user) {
        logout();
        return;
      }
      login(user, accessToken, refreshToken);
      setUser(user);
      if (onSuccess) onSuccess();
    });
  }, [accessToken, refreshToken, login, logout, onSuccess]);

  return { user };
};
