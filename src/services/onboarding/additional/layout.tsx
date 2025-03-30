import { Link } from "react-router-dom";
import { ReactNode } from "react";

export interface OnboardingLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  button?: {
    name: string;
    onPress: () => void;
    subName?: string;
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
          <button
            onClick={button.onPress}
            className="w-full bg-orange-400 text-white font-semibold py-4 rounded-full text-sm"
          >
            {button.name}
          </button>
          {button.subName && (
            <Link to="/" className=" text-sm text-orange-400 underline mt-4">
              {button.subName}
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

export default OnboardingAdditionalLayout;
