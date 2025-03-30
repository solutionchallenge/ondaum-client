import GlobalNavigation from "./commons/navigation/GlobalNavigation";
import BottomNavigation from "./commons/navigation/BottomNavigation";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <GlobalNavigation />
      <Outlet />
      <BottomNavigation />
    </>
  );
}

export default Layout;
