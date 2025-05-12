import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

export function DatePickers({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      animate
      mode="single"
      selected={selectedDate}
      onSelect={(date) => {
        if (date) {
          onSelectDate(date);
        }
      }}
      captionLayout="dropdown-years"
      classNames={{
        today: `border-amber-500`, // Add a border to today's date
        selected: `bg-main/10 text-main rounded-full border-amber-500 font-semibold`, // Highlight the selected day
        root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
        chevron: `fill-main`, // Change the color of the chevron
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
