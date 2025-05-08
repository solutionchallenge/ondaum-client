import { http } from "../fetch";

interface OAuthResponse {
  access_token: string;
  refresh_token: string;
}

export const startGoogleLogin = (redirectUri: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}/oauth/google/start?redirect=${encodeURIComponent(redirectUri)}`;
};

export const exchangeGoogleCode = async (code: string, redirectUri: string) => {
  const response = await http.post<OAuthResponse>(
    `/oauth/google/auth?redirect=${encodeURIComponent(redirectUri)}`,
    { code }
  );
  return response.response;
};
