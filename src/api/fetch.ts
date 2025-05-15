import { refreshToken } from "./auth/login";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseFetch = async (
  url: RequestInfo,
  init?: RequestInit,
  retry: boolean = true
) => {
  const accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...init,
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401 && retry) {
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
          const newAccessToken = await refreshToken(refresh_token);
          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            return baseFetch(url, init, false);
          }
        }
      } catch (e) {
        console.error("Refresh token failed", e);
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      return Promise.reject(new Error("Unauthorized, redirected to login"));
    }
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();
  return { response: json };
};

const http = {
  get: async <T = any>(url: string, params?: Record<string, string>) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return baseFetch(`${url}${queryString}`, {
      method: "GET",
    }) as Promise<{ response: T }>;
  },
  post: async <T = any>(url: string, body?: any) => {
    return baseFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    }) as Promise<{ response: T }>;
  },
  put: async <T = any>(url: string, body?: any) => {
    return baseFetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }) as Promise<{ response: T }>;
  },
  delete: async <T = any>(url: string) => {
    return baseFetch(url, {
      method: "DELETE",
    }) as Promise<{ response: T }>;
  },
};

export { http };
