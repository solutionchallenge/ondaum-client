import GoogleLogo from "../../../assets/images/icon_login.svg?react";

interface LoginButtonProps {
  onClick: () => void;
}

function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-full py-4 bg-white border border-gray-300 rounded-[20px] shadow-md hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-lg transition-opacity"></div>
      <div className="flex items-center space-x-6">
        <div className="w-6 h-6">
          <GoogleLogo />
        </div>

        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </div>
    </button>
  );
}

export default LoginButton;
