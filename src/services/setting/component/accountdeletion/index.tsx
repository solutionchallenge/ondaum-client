import { useState } from "react";
import IconArrow from "../../../../assets/images/icon_arrow_right.svg?react";
import IconWarning from "../../../../assets/images/icon_warning.svg?react";

const AccountDeletion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-third rounded-xl border border-second px-4 py-3">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-font-color">
          How do I delete my account?
        </span>
        <IconArrow
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && <div className="mt-2 border-t border-main" />}

      {isOpen && (
        <div className="mt-4 flex flex-col gap-4">
          <IconWarning />
          <div>
            <h2 className="text-xl font-bold text-font-color mb-1">
              This action is permanent.
            </h2>
            <p className="text-sm text-font-color">
              Deleting your account will remove all your data and cannot be
              undone.
            </p>
          </div>
          <div className="w-full p-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-1">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="delete-confirmation"
                className="w-4 h-4 mt-1 appearance-none border border-second rounded-sm checked:bg-second checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center relative"
              />
              <label
                htmlFor="delete-confirmation"
                className="text-xs text-font-color"
              >
                I understand the consequences of deleting my account.
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full bg-gray_1 text-font-color2 py-2 rounded-md text-base">
              Delete My Account
            </button>
            <button className="w-full bg-main text-white py-2 rounded-md text-base font-semibold">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDeletion;
