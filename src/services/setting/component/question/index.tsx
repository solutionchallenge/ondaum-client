import PasswordResetDropdown from "../passwordoption";
import AccountDeletion from "../accountdeletion";
import IconSearch from "../../../../assets/images/icon_search.svg?react";

const FAQSection = () => {
  return (
    <div className="w-full max-w-md px-5 py-4 bg-white rounded-xl border border-main flex flex-col gap-4">
      <h2 className="text-lg font-medium text-font-color">
        Frequently Asked Questions
      </h2>

      <div className="w-full h-12 rounded-xl border border-main flex items-center px-4">
        <div className="flex items-center gap-2 text-sm text-font-color">
          <IconSearch />
          <span>Enter search terms</span>
        </div>
      </div>

      <PasswordResetDropdown />
      <AccountDeletion />
    </div>
  );
};

export default FAQSection;
