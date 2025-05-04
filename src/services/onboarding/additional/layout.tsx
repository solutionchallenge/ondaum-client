import { Link } from "react-router-dom";
import { ReactNode } from "react";
import Button from "../../../commons/inputs/Button";
import Stepper from "../../../commons/navigation/Stepper";

export interface OnboardingLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  button?: {
    name: string;
    onPress: () => void;
    subName?: string;
    disabled?: boolean;
  };
  currentStep?: number;
}

function OnboardingAdditionalLayout({
  title,
  children,
  button,
  currentStep,
}: OnboardingLayoutProps) {
  return (
    <main className="pb-44">
      {typeof currentStep === "number" && <Stepper currentStep={currentStep} />}
      {title}
      {children}
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
