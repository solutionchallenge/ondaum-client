import GlobalNavigation from "./commons/navigation/GlobalNavigation";
import BottomNavigation from "./commons/navigation/BottomNavigation";
import { Outlet } from "react-router-dom";

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
