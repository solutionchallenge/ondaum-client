import { Route, Routes, useLocation } from "react-router-dom";
import OnboardingConcernPage from "./services/onboarding/additional/concern";
import OnboardingEmotionPage from "./services/onboarding/additional/emotion";
import OnboardingCompletePage from "./services/onboarding/complete";
import HomePage from "./services/home/chat/index.tsx";
import NotFoundPage from "./services/error/404";
import OnboardingBasicPage from "./services/onboarding/basic";
import LoginPage from "./services/auth/login";
import OAuthCallback from "./services/auth/oauth";
import Layout from "./layout.tsx";
import { AnimatePresence } from "framer-motion";
import PHQ from "./services/home/test/PHQ/index.tsx";
import SettingPage from "./services/setting/index.tsx";
import GAD from "./services/home/test/GAD/index.tsx";
import PSS from "./services/home/test/PSS/index.tsx";
import RootRedirect from "./services/redirect/rootRedirect.tsx";
import { useTokenMonitor } from "./hooks/auth/useTokenMonitor";
import ReportMainPage from "./services/report/main/index.tsx";
import ReportDetailPage from "./services/report/detail/index.tsx";

function App() {
  const location = useLocation();
  RootRedirect();
  useTokenMonitor();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="home">
            <Route index path="*" element={<HomePage />} />
            <Route path="test">
              <Route path="phq" element={<PHQ />} />
              <Route path="pss" element={<PSS />} />
              <Route path="gad" element={<GAD />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="report">
            <Route index path="*" element={<NotFoundPage />} />
            <Route path="main" element={<ReportMainPage />} />
            <Route path="detail/:id" element={<ReportDetailPage />} />
          </Route>
        </Route>
        <Route element={<Layout bottomNavigation={false} />}>
          <Route path="onboarding">
            <Route index path="*" element={<NotFoundPage />} />
            <Route path="basic" element={<OnboardingBasicPage />} />
            <Route path="additional">
              <Route index path="*" element={<NotFoundPage />} />
              <Route path="concern" element={<OnboardingConcernPage />} />
              <Route path="emotion" element={<OnboardingEmotionPage />} />
            </Route>
            <Route path="complete" element={<OnboardingCompletePage />} />
          </Route>
        </Route>
        <Route path="/oauth/google" element={<OAuthCallback />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
