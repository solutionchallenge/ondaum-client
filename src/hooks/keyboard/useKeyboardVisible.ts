import { useEffect, useState } from "react";
import { useKeyboardStore } from "../../store/keyboard";

const useKeyboardVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const setKeyboardOpen = useKeyboardStore((state) => state.setKeyboardOpen);

  useEffect(() => {
    const threshold = 100;
    const handleResize = () => {
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;
      const keyboardIsOpen = window.innerHeight - viewportHeight > threshold;

      setIsVisible(keyboardIsOpen);
      setKeyboardOpen(keyboardIsOpen);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [setKeyboardOpen]);

  return isVisible;
};

export { useKeyboardVisible };
