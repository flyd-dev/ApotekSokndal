import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import App from "./App";
import { InquiryProvider } from "./state/inquiry";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Respekterer «reduser bevegelse» i operativsystemet (universell utforming) */}
    <MotionConfig reducedMotion="user">
      <InquiryProvider>
        <App />
      </InquiryProvider>
    </MotionConfig>
  </StrictMode>,
);
