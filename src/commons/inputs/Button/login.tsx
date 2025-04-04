import GoogleLogo from "../../../assets/images/auth_logo.svg?react";

interface LoginButtonProps {
  onClick: () => void;
}

function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-[353px] bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-lg transition-opacity"></div>
      <div className="flex items-center px-4 py-2 space-x-3">
        <div className="w-6 h-6">
          <GoogleLogo />
        </div>

        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </div>
    </button>
  );
}

export default LoginButton;
