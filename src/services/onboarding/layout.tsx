import { ReactNode } from "react";
import Button from "../../commons/inputs/Button";
import Progress from "../../commons/feedback/Progress";
import { motion } from "framer-motion";
import { useNavigationDirection } from "../../hooks/animation/useNavigationDirection";
import BackIcon from "../../assets/images/icon_arrow_back.svg?react";
import Toast from "../../commons/feedback/Toast";

export interface OnboardingLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
  navigation?: () => void;
  button?: {
    name: string;
    onPress: () => void;
    disabled?: boolean;
  };
  toast?: {
    message: ReactNode;
    type: "info" | "success" | "warning" | "error";
  };
  currentStepNumber?: number;
}

function OnboardingAdditionalLayout({
  title,
  children,
  button,
  currentStepNumber,
  navigation,
  backgroundImage,
  toast,
}: OnboardingLayoutProps) {
  const direction = useNavigationDirection();

  const variants = {
    forward: {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    backward: {
      initial: { x: 0, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 0, opacity: 0 },
    },
  };

  return (
    <main
      className="h-[calc(100vh-64px)] pt-16 bg-cover bg-no-repeat bg-origin-content "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "auto 120%",
        backgroundPosition: "50% 200px",
      }}
    >
      <nav className="flex gap-4">
        {navigation && (
          <button onClick={navigation}>
            <BackIcon />
          </button>
        )}
        {currentStepNumber && (
          <div className="w-full py-8">
            <Progress stepCount={2} currentStepNumber={currentStepNumber} />
          </div>
        )}
      </nav>
      {title}
      <motion.div
        className="pb-52"
        initial={variants[direction].initial}
        animate={variants[direction].animate}
        exit={variants[direction].exit}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      {button && (
        <div className="fixed left-0 w-screen bottom-16 py-4 px-4 text-center bg-linear-gradient-to-[#FFBF7D80] from-white to-transparent">
          {toast && (
            <div className="mb-3 inline-block">
              <Toast message={toast.message} type={toast.type} />
            </div>
          )}
          <Button
            onClick={button.onPress}
            disabled={button.disabled}
            color="primary"
          >
            {button.name}
          </Button>
        </div>
      )}
    </main>
  );
}

export default OnboardingAdditionalLayout;
