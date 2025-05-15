import { User } from "../../store/auth";
import { http } from "../fetch";

interface OAuthResponse {
  access_token: string;
  refresh_token: string;
}

interface RefreshReponse {
  access_token: string;
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

export const refreshToken = async (refresh_token: string): Promise<string> => {
  const response = await http.post<RefreshReponse>("/auth/refresh", {
    refresh_token,
  });
  return response.response.access_token;
};

export const getUserInfo = async (): Promise<User> => {
  const { response } = await http.get<User>(`/user/self`);
  return response;
};
