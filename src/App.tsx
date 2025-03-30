import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnboardingConcernPage from "./services/onboarding/additional/concern";
import OnboardingEmotionPage from "./services/onboarding/additional/emotion";
import OnboardingCompletePage from "./services/onboarding/additional/complete";
import Layout from "./Layout.tsx";
import HomePage from "./services/home";
import NotFoundPage from "./services/error/404";
import OnboardingAdditionalLayout from "./services/onboarding/additional/layout.tsx";
import OnboardingBasicPage from "./services/onboarding/basic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<HomePage />} />

          <Route path="onboarding">
            <Route index path="*" element={<NotFoundPage />} />
            <Route path="basic" element={<OnboardingBasicPage />} />
            <Route path="additional">
              <Route index path="*" element={<NotFoundPage />} />
              <Route element={<OnboardingAdditionalLayout />}>
                <Route path="concern" element={<OnboardingConcernPage />} />
                <Route path="emotion" element={<OnboardingEmotionPage />} />
                <Route path="complete" element={<OnboardingCompletePage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
