import GlobalNavigation from "./commons/navigation/GlobalNavigation";
import BottomNavigation from "./commons/navigation/BottomNavigation";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import { motion } from "framer-motion";

function Layout({ direction }: { direction: "forward" | "backward" }) {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const variants = {
    forward: {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    backward: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
  };

  return (
    <>
      <GlobalNavigation />
      <motion.div
        initial={variants[direction].initial}
        animate={variants[direction].animate}
        exit={variants[direction].exit}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
      <BottomNavigation />
    </>
  );
}

export default Layout;
