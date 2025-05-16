import BottomNavigation from "../../commons/navigation/BottomNavigation";
import GlobalNavigation from "../../commons/navigation/GlobalNavigation";
import LanguageSetting from "./LanguageSetting";
import PolicySection from "./Policy";
import FAQSection from "./Question";
import { useEffect } from "react";
import { track } from "../../libs/analytics.ts";

function SettingPage() {
  useEffect(() => {
    track("view", { label: "setting", value: "설정 화면" });
  }, []);

  return (
    <main className="pb-52 pt-16 mt-5 bg-white">
      <div className="flex flex-col items-center gap-5 w-full px-5">
        <GlobalNavigation />
        <LanguageSetting />
        <FAQSection />
        <PolicySection />
      </div>
      <BottomNavigation />
    </main>
  );
}

export default SettingPage;
