import { useState } from "react";
import Switch from "../../../../commons/inputs/Switch"; // assumes Switch component is stored here
import LanguageSelect from "../languageoption";

const LanguageSetting = () => {
  const [autoDetect, setAutoDetect] = useState(true);

  return (
    <div className="w-full max-w-md px-5 py-4 bg-white rounded-xl border border-[#f8a047] flex flex-col gap-4">
      <div className="text-lg font-medium text-font-color">
        Language Settings
      </div>

      <div className="flex justify-between items-center w-full">
        <span className="text-sm text-font-color">Current Language</span>
        <div className="ml-auto">
          <LanguageSelect />
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <span className="text-sm text-font-color">Auto Language Detection</span>
        <Switch checked={autoDetect} onChange={setAutoDetect} />
      </div>
    </div>
  );
};

export default LanguageSetting;
