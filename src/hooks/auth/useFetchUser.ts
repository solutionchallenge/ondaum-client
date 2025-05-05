import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchUser = (
  accessToken: string | null,
  onSuccess?: () => void
) => {
  const { login } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    fetch(`${API_BASE_URL}/user/self`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        login(user);
        if (onSuccess) onSuccess();
      });
  }, [accessToken, login, onSuccess]);
};
