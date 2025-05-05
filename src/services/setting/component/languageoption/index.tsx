import { useState } from "react";
import IconArrow from "../../../../assets/images/icon_arrow_right.svg?react";

const languages = ["English", "한국어", "日本語", "中国话"];

const LanguageSelect = () => {
  const [selected, setSelected] = useState("English");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-third rounded-full border border-main"
        >
          <span className="text-sm text-font-color">{selected}</span>
          <IconArrow
            className={`transform transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[130px] px-5 py-2.5 bg-third rounded-xl border border-main flex flex-col gap-2.5 z-10">
          {languages.map((lang) => (
            <div
              key={lang}
              onClick={() => {
                setSelected(lang);
                setIsOpen(false);
              }}
              className={`px-3 py-1 rounded-lg text-sm text-font-color cursor-pointer ${
                selected === lang ? "bg-second" : ""
              }`}
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
