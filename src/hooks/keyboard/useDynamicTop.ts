import { useEffect, useState } from "react";
import { getDynamicTop } from "./useDevice";

export const useDynamicTop = (isKeyboardOpen: boolean) => {
  const [top, setTop] = useState(0);

  useEffect(() => {
    let lastValidTop = 0;

    const update = () => {
      const value = getDynamicTop(isKeyboardOpen);
      if (isKeyboardOpen && value == 0) {
        console.log(
          "[useDynamicTop] skip invalid 0px top during keyboard open"
        );
        setTop(lastValidTop);
      } else {
        console.log("[useDynamicTop] updated top:", value);
        lastValidTop = value;
        setTop(value);
      }
    };

    update();
    const timeout = setTimeout(update, 50);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      clearTimeout(timeout);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [isKeyboardOpen]);

  return top;
};
