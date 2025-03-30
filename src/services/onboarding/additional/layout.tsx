import { Outlet } from "react-router-dom";

function OnboardingAdditionalLayout() {
  return (
    <>
      <div>header</div>
      <Outlet />
      <button>버튼 </button>
    </>
  );
}
export default OnboardingAdditionalLayout;
