import { useEffect, useState } from "react";
import { useAuthStore, User } from "../../store/auth/index";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchUser = (
  accessToken: string | null,
  refreshToken: string | null,
  onSuccess?: (user: User) => void
) => {
  const { login, logout } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      setLoading(false);
      return;
    }
    setLoading(true);

    fetch(`${API_BASE_URL}/user/self`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          logout();
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((user) => {
        if (!user) {
          setLoading(false);
          return;
        }
        login(user as User, accessToken, refreshToken);
        setUser(user);
        if (onSuccess) onSuccess(user as User);
        setLoading(false);
      });
  }, [accessToken, refreshToken, login, logout, onSuccess]);

  return { user, loading };
};
