import { useEffect } from "react";

export function useAutoScrollOnInputFocus() {
  useEffect(() => {
    const inputEl = document.querySelector("input");
    if (!inputEl) return;

    const handleFocus = () => {
      setTimeout(() => {
        inputEl.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
    };

    inputEl.addEventListener("focus", handleFocus);
    return () => {
      inputEl.removeEventListener("focus", handleFocus);
    };
  }, []);
}
