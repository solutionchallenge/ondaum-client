import { useNavigate } from "react-router-dom";

export function useOnboardingAdditional() {
  const navigate = useNavigate();

  const goConcernPage = () => {
    // Todo api 성공 이후 보내기
    navigate("/onboarding/additional/concern");
  };
  const goEmotionPage = () => {
    // Todo api 성공 이후 보내기
    navigate("/onboarding/additional/emotion");
  };
  const goCompletePage = () => {
    // Todo api 성공 이후 보내기
    navigate("/onboarding/complete");
  };
  const goBackPage = () => {
    navigate(-1);
  };
  const goHomePage = () => {
    // Todo api 성공 이후 보내기
    navigate("/");
  };

  return {
    goConcernPage,
    goEmotionPage,
    goCompletePage,
    goHomePage,
    goBackPage,
  };
}
