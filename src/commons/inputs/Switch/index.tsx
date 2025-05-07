import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
        checked ? "bg-main" : "bg-[#AEAEAE]"
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full border transition-transform duration-300 ${
          checked
            ? "translate-x-6 bg-white border-main"
            : "translate-x-0 bg-white border-[#AEAEAE]"
        }`}
      />
    </div>
  );
};

export default Switch;
