import ReportLayout from "../layout";
import Card from "../../../commons/surfaces/Card";
import PhoneIcon from "../../../assets/images/icon_phone.svg?react";
import BackIcon from "../../../assets/images/icon_arrow_back.svg?react";
import { useState, useEffect } from "react";
import SolutionModal from "../../home/test/SolutionModal";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "../../../assets/images/icon_check.svg?react";
import { ChatDetailResponse, getChatDetail } from "../../../api/report/chats";
import { useAuthStore } from "../../../store/auth";
import UmIcon from "../../../assets/images/icon_um.svg?react";
import { EmotionIcon } from "../../../commons/data-display/EmotionIcon";

function ReportDetailPage() {
  const navigate = useNavigate();
  const { session_id } = useParams();
  const { user } = useAuthStore();
  const [detail, setDetail] = useState<ChatDetailResponse>();
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const fetchDetail = async (id: string) => {
    const response = await getChatDetail(id);
    setDetail(response);
  };

  useEffect(() => {
    if (!session_id) return;
    fetchDetail(session_id);
  }, [session_id]);

  return (
    <ReportLayout>
      <h1 className="text-2xl font-bold whitespace-pre-line flex gap-4">
        <BackIcon className="w-6 h-6 mt-2" onClick={() => navigate(-1)} />
        {`Here's your\nTalking summary`}
      </h1>
      <div className="w-full text-xs text-center bg-second text-white py-1 rounded-full mb-8 mt-12">
        {dayjs(detail?.started_date).format("ddd, MMM DD, hh:mm a")}
      </div>
      <Card
        title="Conversation Summary"
        description="The consultation revealed signs of moderate anxiety, suggesting a need for continued emotional support and stress management"
        styleType="fill-white/outline-third"
      />
      <div className="my-6">
        <h2 className="font-semibold text-md mb-2">Key Themes</h2>
        <div className="flex flex-wrap gap-2">
          {detail?.summary.keywords.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-orange-100 rounded-xl p-4 mb-6 bg-white">
        <h2 className="font-semibold text-md mb-3">Mood of the Day</h2>
        <div className="flex items-center gap-2">
          <EmotionIcon
            emotion={detail?.summary?.emotions?.[0]?.emotion || ""}
            className="w-4 h-4"
          />
          <span className={`text-black text-sm`}>
            {detail?.summary?.emotions?.[0]?.emotion}
          </span>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-${detail?.summary?.emotions?.[0]?.emotion}`}
                style={{
                  width: `${detail?.summary?.emotions?.[0]?.rate ? detail?.summary?.emotions?.[0]?.rate * 100 : 0}%`,
                }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {detail?.summary?.emotions?.[0]?.rate
              ? detail?.summary?.emotions?.[0]?.rate * 100
              : "-"}
            %
          </span>
        </div>
      </div>
      <div className="border border-orange-100 rounded-xl p-4 mb-8 bg-white">
        <h2 className="font-semibold text-md mb-3">Recommendations</h2>
        <ul className="text-sm list-none space-y-3">
          {detail?.summary?.recommendations.map((item) => (
            <li key={item} className="block flex items-center gap-2">
              <div className="w-4 h-4">
                <CheckIcon />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-orange-100 rounded-xl p-4 mb-8 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-md">Conversation</h2>
        </div>
        <div className="space-y-2">
          {detail?.summary?.topic_messages?.map((item) =>
            item.role === "assistant" ? (
              <div className="mb-4 flex gap-2">
                <div>
                  <UmIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold text-main mb-2">Um</p>

                  <div key={item.id}>
                    <span className="border border-gray-1 bg-gray-2 inline-block px-3 py-2 rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px] text-sm text-font-color mb-2">
                      {JSON.parse(item.content)?.data}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-xs font-semibold text-main mb-2">
                  {user?.username}
                </p>
                <div key={item.id}>
                  <span className="border border-main bg-third text-left inline-block px-3 py-2 rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[15px] text-sm text-font-color mb-2">
                    {item.content}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
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
