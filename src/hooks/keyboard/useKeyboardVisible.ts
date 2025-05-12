import { useEffect, useState } from "react";

const useKeyboardVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const threshold = 100; // 화면 줄어든 정도 (픽셀 기준)

    const handleResize = () => {
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;
      const windowHeight = window.innerHeight;
      const keyboardIsOpen = windowHeight - viewportHeight > threshold;

      setIsVisible(keyboardIsOpen);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize); // fallback

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isVisible;
};

export default useKeyboardVisible;
