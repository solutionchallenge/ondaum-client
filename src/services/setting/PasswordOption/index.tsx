import { useState } from "react";
import IconArrow from "../../../assets/images/icon_arrow_right.svg?react";
import IconEmail from "../../../assets/images/icon_email.svg?react";
import IconInput from "../../../commons/inputs/TextField/icon";

const PasswordResetDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full bg-third rounded-xl border border-main px-4 py-3">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-font-color">I forgot my password</span>
        <IconArrow
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && <div className="mt-2 border-t border-main" />}

      {isOpen && (
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-xl font-bold text-font-color">
            Reset Password
          </div>
          <p className="text-sm text-font-color">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <div className="w-full">
            <IconInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<IconEmail />}
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <button className="w-full bg-main text-white py-2 rounded-md font-semibold text-base">
            Send Reset Link
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordResetDropdown;
