import GlobalNavigation from "./commons/navigation/GlobalNavigation";
import BottomNavigation from "./commons/navigation/BottomNavigation";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/auth";

function Layout() {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <GlobalNavigation />
        <Outlet />
      <BottomNavigation />
    </>
  );
}

export default Layout;
