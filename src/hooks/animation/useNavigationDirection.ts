import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function useNavigationDirection() {
  const location = useLocation();
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const historyStack = useRef<string[]>([]);
  const currentKey = location.key;

  useEffect(() => {
    const currentIndex = historyStack.current.indexOf(currentKey);

    if (currentIndex === -1) {
      // 새 페이지 → 앞으로 이동
      historyStack.current.push(currentKey);
      setDirection("forward");
    } else {
      // 기존 페이지 → 뒤로 이동
      historyStack.current = historyStack.current.slice(0, currentIndex + 1);
      setDirection("backward");
    }
  }, [currentKey]);

  return direction;
}
