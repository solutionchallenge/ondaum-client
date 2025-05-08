import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export function useNavigationDirection() {
  const location = useLocation();
  const action = useNavigationType();
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const historyStack = useRef<string[]>([]);

  useEffect(() => {
    if (action === "POP") {
      // 브라우저 뒤로가기나 앞으로가기
      setDirection("backward");
    } else if (action === "PUSH") {
      // 새로운 페이지로 이동
      historyStack.current.push(location.key);
      setDirection("forward");
    } else if (action === "REPLACE") {
      // 현재 페이지 교체
      setDirection("forward");
    }
  }, [location.key, action]);

  return direction;
}
