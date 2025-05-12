import BottomNavigation from "../../commons/navigation/BottomNavigation";
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
      <div className="absolute z-0 bottom-0 w-full h-72 bg-gradient-to-b from-[#fffaf4]/20 to-[#f57c00]/20 pointer-events-none" />
    </main>
  );
}

export default SettingPage;
