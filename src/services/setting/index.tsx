import BottomNavigation from "../../commons/navigation/BottomNavigation";
import GlobalNavigation from "../../commons/navigation/GlobalNavigation";
import LanguageSetting from "./component/languagesetting";
import PolicySection from "./component/policy";

function SettingPage() {
  return (
    <main className="relative pt-24 px-3 gap-5 flex flex-col h-screen overflow-hidden bg-white">
      <GlobalNavigation />
      <LanguageSetting />
      <PolicySection />
      <BottomNavigation />
    </main>
  );
}

export default SettingPage;
