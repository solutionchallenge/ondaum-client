const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseFetch = async (url: RequestInfo, init?: RequestInit) => {
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
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const json = await res.json();
  return { response: json };
};

const http = {
  get: async <T = any>(url: string, params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
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
