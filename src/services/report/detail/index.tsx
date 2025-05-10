import ReportLayout from "../layout";
import Card from "../../../commons/surfaces/Card";
import PhoneIcon from "../../../assets/images/icon_phone.svg?react";
// import SadnessIcon from "../../../assets/images/chatresult/icon_sadness.svg?react";
import { useState } from "react";
import SolutionModal from "../../home/test/SolutionModal";
function ReportDetailPage() {
  const [reportModalVisible, setReportModalVisible] = useState(false);

  return (
    <ReportLayout>
      {/* Title */}
      <h1 className="text-2xl font-bold whitespace-pre-line">{`Here's your\nTalking summary`}</h1>

      {/* Date */}
      <div className="w-full text-xs text-center bg-second text-white py-1 rounded-full my-4">
        Sun, March 09, 4:55 pm
      </div>

      {/* Summary */}
      <Card
        title="Conversation Summary"
        description="The consultation revealed signs of moderate anxiety, suggesting a need for continued emotional support and stress management"
        styleType="fill-white/outline-third"
      />

      {/* Key Themes */}
      <div className="mb-4">
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
      <div className="border border-orange-100 rounded-xl p-4 mb-4 bg-white">
        <h2 className="font-semibold text-md mb-1">Mood of the Day</h2>
        <div className="flex items-center gap-2">
        <img src={'../../../assets/images/chatresult/icon_sadness.svg'} alt="Sadness" className="w-4 h-4" />
          <span className={`text-black text-sm`}>
            Sadness
          </span>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full bg-${"sadness"} w-[70%]`} />
            </div>
          </div>
          <span className="text-sm text-gray-500">70%</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-orange-100 rounded-xl p-4 mb-4 bg-white">
        <h2 className="font-semibold text-md mb-2">Recommendations</h2>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Take 3 quiet minutes each day</li>
          <li>Stop working at least 2 hours before bed</li>
          <li>Take a 10minute break every 90 minutes</li>
        </ul>
      </div>

      {/* Conversation */}
      <div className="border border-orange-100 rounded-xl p-4 mb-4 bg-white">
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
