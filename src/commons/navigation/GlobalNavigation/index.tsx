import { useAuthStore } from "../../../store/auth";
import OndaumLogo from "../../../assets/images/icon_logo.svg?react";
import MyPage from "../../../assets/images/icon_mypage.svg?react";

function GlobalNavigation() {
  const { user } = useAuthStore();
  return (
    <header className="w-screen h-16 flex items-center bg-[#fafafa] justify-between px-4 sticky top-0">
      <div>
        <OndaumLogo />
      </div>
      {user && (
        <button>
          <MyPage />
        </button>
      )}
    </header>
  );
}
export default GlobalNavigation;
