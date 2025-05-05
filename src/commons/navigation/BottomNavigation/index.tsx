import { NavLink } from "react-router-dom";
import HomeFalse from "../../../assets/images/bottom/icon_home_false.svg?react";
import Hometrue from "../../../assets/images/bottom/icon_home_true.svg?react";
import SettingFalse from "../../../assets/images/bottom/icon_setting_false.svg?react";
import Settingtrue from "../../../assets/images/bottom/icon_setting_true.svg?react";
import ReportFalse from "../../../assets/images/bottom/icon_report_false.svg?react";
import Reporttrue from "../../../assets/images/bottom/icon_report_true.svg?react";

function BottomNavigation() {
  return (
    <footer className="fixed bottom-0 z-10 w-screen items-center bg-white h-16 flex justify-around">
      <NavLink to={"/onboarding/additional/concern"}>
        {({ isActive }) => (isActive ? <Settingtrue /> : <SettingFalse />)}
      </NavLink>
      <NavLink to={"/home"}>
        {({ isActive }) => (isActive ? <Hometrue /> : <HomeFalse />)}
      </NavLink>
      <NavLink to={"/report"}>
        {({ isActive }) => (isActive ? <Reporttrue /> : <ReportFalse />)}
      </NavLink>
    </footer>
  );
}
export default BottomNavigation;
