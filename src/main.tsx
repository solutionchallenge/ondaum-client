import { Profiler, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Profiler
      id="App"
      onRender={(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
      ) => {
        console.log(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime
        );
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Profiler>
  </StrictMode>
);
