import MonthlyBarChart from "./MonthlyBarChart";
import { DayPicker } from "react-day-picker";
import { ReportResponse } from "../../../../api/report/report";
import dayjs from "dayjs";
import MonthlyPieChart from "./MonthlyPieChart";

function MontlyOverview({
  report,
  reportDate,
  setReportDate,
}: {
  report?: ReportResponse;
  reportDate: Date;
  setReportDate: (date: Date) => void;
}) {
  return (
    <section className="flex flex-col gap-4 p-4 bg-[#ffffff] rounded-lg border border-third mt-5 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Monthly Overview</h1>
        <DayPicker
          formatters={{
            formatCaption: (date) => dayjs(date).format("YYYY.MM"),
          }}
          className="dayPicker-monthly"
          selected={reportDate}
          onMonthChange={(month) => {
            setReportDate(month);
          }}
        />
      </div>
      <MonthlyBarChart report={report} />
      <h1 className="font-semibold mb-2 text-font-color">Overall Mood</h1>
      <div className="flex items-center justify-between gap-4 pointer-events-none">
        <MonthlyPieChart report={report} />
        <div className="flex gap-2 text-font-color">
          <div className="text-center p-3 border border-gray-200 rounded-md">
            <p className="text-sm">Total Chats</p>
            <p className="text-xl font-semibold ">
              {report?.total_chat_count || "-"}
            </p>
          </div>
          <div className="text-center p-3 border border-gray-200 rounded-md">
            <p className="text-sm">Avg. Duration</p>
            <p className="text-xl font-semibold ">
              {report?.average_chat_duration || "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MontlyOverview;
