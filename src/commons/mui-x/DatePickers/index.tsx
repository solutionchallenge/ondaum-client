import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

export function DatePickers() {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      captionLayout="dropdown-years"
      classNames={{
        today: `border-amber-500`, // Add a border to today's date
        selected: `bg-[#f57c00]/10 text-[#f57c00] rounded-full border-amber-500 text-white`, // Highlight the selected day
        root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
        chevron: `fill-[#f57c00]`, // Change the color of the chevron
        weekday: `text-[#3C3C43]/30 uppercase text-xs`, // ✅ Add this line for weekday style
      }}
      formatters={{
        formatWeekdayName: (date) => {
          return date
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase();
        },
      }}
    />
  );
}
