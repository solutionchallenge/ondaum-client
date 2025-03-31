import { Link } from "react-router-dom";
import { ReactNode } from "react";
import Button from "../../../commons/inputs/Button";

export interface OnboardingLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  button?: {
    name: string;
    onPress: () => void;
    subName?: string;
    disabled?: boolean;
  };
}

function OnboardingAdditionalLayout({
  title,
  children,
  button,
}: OnboardingLayoutProps) {
  return (
    <main className="pb-44">
      {title}
      {children}
      {button && (
        <div className="fixed w-screen bottom-16 py-4 px-4 text-center">
          <Button onClick={button.onPress} disabled={button.disabled}>
            {button.name}
          </Button>
          {button.subName && (
            <Link to="/" className="text-sm text-orange-400 underline mt-4">
              {button.subName}
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

export default OnboardingAdditionalLayout;
