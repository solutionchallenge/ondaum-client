import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/auth/index";
import { refreshToken } from "../../api/auth/login";

const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 10; // 10분마다 체크

export const useTokenMonitor = () => {
  const { refreshToken: storedRefreshToken, setTokens } = useAuthStore();
  const refreshTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!storedRefreshToken) return;

      try {
        const { access_token, refresh_token } =
          await refreshToken(storedRefreshToken);
        setTokens(access_token, refresh_token);
      } catch (error) {
        console.error("Token refresh failed:", error);
        // 토큰 리프레시 실패 시 로그아웃 처리
        setTokens(null, null);
      }
    };

    // 주기적으로 토큰 체크
    refreshTimerRef.current = window.setInterval(
      checkAndRefreshToken,
      TOKEN_REFRESH_INTERVAL
    );

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (refreshTimerRef.current) {
        window.clearInterval(refreshTimerRef.current);
      }
    };
  }, [storedRefreshToken, setTokens]);

  return null;
};
