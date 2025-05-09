﻿import BottomNavigation from "../../commons/navigation/BottomNavigation";
import GlobalNavigation from "../../commons/navigation/GlobalNavigation";
import LanguageSetting from "./LanguageSetting";
import PolicySection from "./Policy";
import FAQSection from "./Question";

function SettingPage() {
  return (
    <main className="flex flex-col items-center py-24 px-3 gap-5 flex-col h-screen overflow-y-auto bg-white">
      <GlobalNavigation />
      <LanguageSetting />
      <FAQSection />
      <PolicySection />
      <BottomNavigation />
    </main>
  );
}

export default SettingPage;
