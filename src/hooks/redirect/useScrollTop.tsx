import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function useScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
}

export default useScrollTop;
