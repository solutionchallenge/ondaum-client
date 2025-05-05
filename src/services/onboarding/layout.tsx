import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import Button from "../../commons/inputs/Button";
import Progress from "../../commons/feedback/Progress";
import { motion } from "framer-motion";
import { useNavigationDirection } from "../../hooks/animation/useNavigationDirection";
import BackIcon from "../../assets/images/icon_arrow_back.svg?react";

export interface OnboardingLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  navigation?:()=>void;
  button?: {
    name: string;
    onPress: () => void;
    subName?: string;
    disabled?: boolean;
  };
  currentStepNumber?: number;
}

function OnboardingAdditionalLayout({
  title,
  children,
  button,
  currentStepNumber,  
  navigation,
}: OnboardingLayoutProps) {
  const direction = useNavigationDirection();
  const variants = {
    forward: {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    backward: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
  };


  return (
    <main className="pb-44 px-5">
        <nav className="flex gap-4">
        {navigation && (
            <button onClick={navigation}>
              <BackIcon />  
            </button>
          )}
          {currentStepNumber &&
          <div className="w-full py-8">
            <Progress stepCount={2} currentStepNumber={currentStepNumber} />
            </div>
          }
        </nav>
      {title}
      <motion.div
        initial={variants[direction].initial}
        animate={variants[direction].animate}
        exit={variants[direction].exit}
        transition={{ duration: 0.3 }}
      >
      {children}
      </motion.div>
      {button && (
        <div className="fixed w-screen bottom-16 py-4 px-4 text-center">
          <Button onClick={button.onPress} disabled={button.disabled}>
            {button.name}
          </Button>
          {button.subName && (
            <Link to="/" className="text-sm text-second underline mt-4">
              {button.subName}
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

export default OnboardingAdditionalLayout;
