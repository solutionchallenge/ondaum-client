import BottomNavigation from "../../commons/navigation/BottomNavigation";
import GlobalNavigation from "../../commons/navigation/GlobalNavigation";
import LanguageSetting from "./LanguageSetting";
import PolicySection from "./Policy";
import FAQSection from "./Question";

function SettingPage() {
  return (
    <main className="flex flex-col gap-5 pb-52 pt-16 px-5 mt-5 bg-white">
      <GlobalNavigation />
      <LanguageSetting />
      <FAQSection />
      <PolicySection />
      <BottomNavigation />
    </main>
  );
}

export default SettingPage;
