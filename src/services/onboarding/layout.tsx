import { ReactNode } from "react";
import Button from "../../commons/inputs/Button";
import Progress from "../../commons/feedback/Progress";
import BackIcon from "../../assets/images/icon_arrow_back.svg?react";
import Toast from "../../commons/feedback/Toast";

export interface OnboardingLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  backgroundImage?: ReactNode;
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
  return (
    <main
      className={`relative h-screen pt-16 ${backgroundImage && "overflow-hidden"}`}
    >
      <nav className="flex gap-4 px-5">
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
      <div className="relative px-5 z-10">{title}</div>
      <div className="relative pb-40 z-10">{children}</div>
      <div className="absolute inset-x-0 left-0 -bottom-1/3 w-full z-0">
        {backgroundImage}
      </div>
      {button && (
        <div className="fixed z-30 left-0 w-screen bottom-0 py-4 px-4 text-center bg-gradient-to-b from-transparent to-[#FFBE7DCC]">
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
