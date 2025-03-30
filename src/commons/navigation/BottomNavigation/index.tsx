import { NavLink } from "react-router-dom";

function BottomNavigation() {
  return (
    <footer className="fixed bottom-0 z-10 w-screen white h-16 flex justify-around">
      <NavLink to={"/onboarding/additional/concern"}>concern</NavLink>
      <NavLink to={"/"}>home</NavLink>
      <NavLink to={"/more"}>more</NavLink>
    </footer>
  );
}
export default BottomNavigation;
