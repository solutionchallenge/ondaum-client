import { useEffect } from "react";

export function useBodyScrollLockWithKeyboard() {
  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow =
        window.innerHeight < window.outerHeight ? "auto" : "hidden";
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, []);
}
