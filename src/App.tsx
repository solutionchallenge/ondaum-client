import { Route, Routes, useLocation } from "react-router-dom";
import OnboardingConcernPage from "./services/onboarding/additional/concern";
import OnboardingEmotionPage from "./services/onboarding/additional/emotion";
import OnboardingCompletePage from "./services/onboarding/additional/complete";
import HomePage from "./services/home";
import NotFoundPage from "./services/error/404";
import OnboardingBasicPage from "./services/onboarding/basic";
import LoginPage from "./services/auth/login";
import Layout from "./layout.tsx";
import { AnimatePresence } from "framer-motion";
import { useNavigationDirection } from "./hooks/animation/useNavigationDirection.ts";

function App() {
  const location = useLocation();
  const direction = useNavigationDirection();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout direction={direction} />}>
          <Route index element={<HomePage />} />
          <Route path="onboarding">
            <Route index path="*" element={<NotFoundPage />} />
            <Route path="basic" element={<OnboardingBasicPage />} />
            <Route path="additional">
              <Route index path="*" element={<NotFoundPage />} />
              <Route path="concern" element={<OnboardingConcernPage />} />
              <Route path="emotion" element={<OnboardingEmotionPage />} />
              <Route path="complete" element={<OnboardingCompletePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
