import { useAuthStore } from "../../../store/auth";
import OndaumLogo from "../../../assets/images/icon_logo.svg?react";
import MyPage from "../../../assets/images/icon_mypage.svg?react";

function GlobalNavigation() {
  const { user } = useAuthStore();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-white justify-between px-4 shadow">
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
