import BottomNavigation from "../../commons/navigation/BottomNavigation";
import GlobalNavigation from "../../commons/navigation/GlobalNavigation";
import LanguageSetting from "./component/languagesetting";

function SettingPage() {
  return (
    <main className="relative pt-24 px-3 flex flex-col h-screen overflow-hidden bg-white">
      <GlobalNavigation />
      <LanguageSetting />
      <BottomNavigation />
    </main>
  );
}

export default SettingPage;
