import { Route, Routes, useLocation } from "react-router-dom";
import OnboardingConcernPage from "./services/onboarding/additional/concern";
import OnboardingEmotionPage from "./services/onboarding/additional/emotion";
import OnboardingCompletePage from "./services/onboarding/complete";
import HomePage from "./services/home";
import NotFoundPage from "./services/error/404";
import OnboardingBasicPage from "./services/onboarding/basic";
import LoginPage from "./services/auth/login";
import OAuthCallback from "./services/auth/oauth";
import Layout from "./layout.tsx";
import { AnimatePresence } from "framer-motion";
import PhqPage from "./services/home/test/phq/index.tsx";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="home">
            <Route index path="*" element={<HomePage />} />
            <Route path="test">
              <Route path="phq" element={<PhqPage />} />
              <Route path="pss" element={<OnboardingEmotionPage />} />
              <Route path="gad" element={<OnboardingCompletePage />} />
            </Route>
          </Route>
          <Route path="onboarding">
            <Route index path="*" element={<NotFoundPage />} />
            <Route path="basic" element={<OnboardingBasicPage />} />
            <Route path="additional">
              <Route index path="*" element={<NotFoundPage />} />
              <Route path="concern" element={<OnboardingConcernPage  />} />
              <Route path="emotion" element={<OnboardingEmotionPage />} />
            </Route>
            <Route path="complete" element={<OnboardingCompletePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/oauth/google" element={<OAuthCallback />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
