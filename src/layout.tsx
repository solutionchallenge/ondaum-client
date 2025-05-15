import { Outlet } from "react-router-dom";
import GlobalNavigation from "./commons/navigation/GlobalNavigation";
import BottomNavigation from "./commons/navigation/BottomNavigation";

function Layout({ bottomNavigation = true }: { bottomNavigation?: boolean }) {
  return (
    <>
      <GlobalNavigation />
      <Outlet />
      {bottomNavigation && <BottomNavigation />}
    </>
  );
}

export default Layout;
