interface DateChipProps {
  date?: Date;
}

export default function DateChip({ date }: DateChipProps) {
  const formattedDate = date
    ? `${date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "2-digit",
      })}, ${date
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase()}`
    : "Date not defined";

  return (
    <div className="inline-flex items-center justify-center w-full mb-4 py-1 bg-gray-2 rounded-full">
      <div className="text-font-color text-xs text-center">{formattedDate}</div>
    </div>
  );
}
