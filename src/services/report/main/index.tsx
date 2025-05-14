import { useEffect, useState } from "react";
import UmStressImage from "../../../assets/images/image_um_stress.svg?react";
import ReportLayout from "../layout";
import Card from "../../../commons/surfaces/Card";
import dayjs from "dayjs";
import { getChatReport, ReportResponse } from "../../../api/report/report";
import Recommendations from "./recommendations/Recommendations";
import Conversations from "./conversations/Conversations";
import MontlyOverview from "./monthly-overview/MonthlyOverview";

function ReportMainPage() {
  const [report, setReport] = useState<ReportResponse>();
  const [reportDate, setReportDate] = useState(new Date());

  const fetchReport = async () => {
    const response = await getChatReport({
      datetime_gte: dayjs(reportDate).startOf("month").toISOString(),
      datetime_lte: dayjs(reportDate).endOf("month").toISOString(),
    });
    setReport(response);
  };

  useEffect(() => {
    fetchReport();
  }, [reportDate]);

  return (
    <ReportLayout>
      <Card
        title="Storage box management"
        styleType="fill-main/outline-main"
        description={`Let's take a look at your conversation\nrecords together.`}
      />
      <MontlyOverview
        report={report}
        reportDate={reportDate}
        setReportDate={setReportDate}
      />
      {report?.stress_level_descriptor?.title && (
        <Card
          icon={<UmStressImage />}
          styleType="fill-white/outline-main"
          title={report?.stress_level_descriptor?.title}
          description={report?.stress_level_descriptor?.description}
        />
      )}
      {!report?.total_chat_count && <Recommendations />}
      <Conversations />
    </ReportLayout>
  );
}
export default ReportMainPage;
