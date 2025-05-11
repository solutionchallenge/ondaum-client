import ReportLayout from "../layout";
import Card from "../../../commons/surfaces/Card";
import PhoneIcon from "../../../assets/images/icon_phone.svg?react";
import BackIcon from "../../../assets/images/icon_arrow_back.svg?react";
import { useState } from "react";
import SolutionModal from "../../home/test/SolutionModal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../../assets/images/icon_check.svg?react";

function ReportDetailPage() {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const navigate = useNavigate();
  const [emotion] = useState<string>("fear");

  return (
    <ReportLayout>
      <h1 className="text-2xl font-bold whitespace-pre-line flex gap-4">
        <BackIcon className="w-6 h-6 mt-2" onClick={() => navigate(-1)} />
        {`Here's your\nTalking summary`}
      </h1>

      {/* Date */}
      <div className="w-full text-xs text-center bg-second text-white py-1 rounded-full mb-8 mt-12">
        {dayjs().format("ddd, MMM DD, hh:mm a")}
      </div>

      {/* Summary */}
      <Card
        title="Conversation Summary"
        description="The consultation revealed signs of moderate anxiety, suggesting a need for continued emotional support and stress management"
        styleType="fill-white/outline-third"
      />

      {/* Key Themes */}
      <div className="my-6">
        <h2 className="font-semibold text-md mb-2">Key Themes</h2>
        <div className="flex flex-wrap gap-2">
          {["#overthinking", "#feelinglow", "#reflect"].map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mood of the Day */}
      <div className="border border-orange-100 rounded-xl p-4 mb-6 bg-white">
        <h2 className="font-semibold text-md mb-1">Mood of the Day</h2>
        <div className="flex items-center gap-2">
          <img
            src={`../../../assets/images/chatresult/icon_${emotion}.svg?react`}
            alt={emotion}
            className="w-4 h-4"
          />
          <span className={`text-black text-sm`}>{emotion}</span>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full bg-${"emotion"} w-[70%]`} />
            </div>
          </div>
          <span className="text-sm text-gray-500">70%</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-orange-100 rounded-xl p-4 mb-8 bg-white">
        <h2 className="font-semibold text-md mb-2">Recommendations</h2>
        <ul className="text-sm list-none space-y-3">
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4" />
            Take 3 quiet minutes each day
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4" />
            Stop working at least 2 hours before bed
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4" />
            Take a 10minute break every 90 minutes
          </li>
        </ul>
      </div>

      {/* Conversation */}
      <div className="border border-orange-100 rounded-xl p-4 mb-8 bg-white">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-md">Conversation</h2>
          <span className="text-gray-400">›</span>
        </div>
        <div className="space-y-2">
          <div className="text-left">
            <p className="text-xs font-medium text-orange-500">Um</p>
            <div className="bg-gray-100 inline-block px-3 py-2 rounded-xl text-sm text-gray-800">
              Hello, do you have any concerns?
              <br />
              Feel free to tell me.
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-orange-500">GGaengster</p>
            <div className="bg-orange-100 inline-block px-3 py-2 rounded-xl text-sm text-gray-800">
              Um... I'm thinking about quitting my job. It's too hard.
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Card
        icon={<PhoneIcon />}
        title="Talk to Someone"
        styleType="fill-third/outline-main"
        description="Nearby clinics are here for you."
        onClick={() => setReportModalVisible(true)}
      />
      {reportModalVisible && (
        <SolutionModal onClose={() => setReportModalVisible(false)} />
      )}
    </ReportLayout>
  );
}
export default ReportDetailPage;
