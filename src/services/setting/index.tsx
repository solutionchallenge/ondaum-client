import BottomNavigation from "../../commons/navigation/BottomNavigation";
import GlobalNavigation from "../../commons/navigation/GlobalNavigation";
import LanguageSetting from "./LanguageSetting";
import PolicySection from "./Policy";
import FAQSection from "./Question";
import { useAuthStore } from "../../store/auth";

function SettingPage() {
  const { logout } = useAuthStore();

  return (
    <main className="pb-52 pt-16 mt-5 bg-white">
      <div className="flex flex-col items-center gap-5 w-full px-5">
        <GlobalNavigation />
        <LanguageSetting />
        <FAQSection />
        <PolicySection />
        <p
          className=" text-main font-bold  underline cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </p>
      </div>
      <BottomNavigation />
    </main>
  );
}

export default SettingPage;
