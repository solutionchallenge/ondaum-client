import { useState } from "react";
import MeditationModal from "./MeditationModal";
import AngerPersonIcon from "../../../assets/images/icon_person_anger.svg?react";
import QuestionMarkIcon from "../../../assets/images/icon_questionmark.svg?react";
import UmStressImage from "../../../assets/images/image_um_stress.svg?react";
import ArrowDownIcon from "../../../assets/images/icon_arrow_down.svg?react";
import SearchFilterBottomSheet from "./SearchFilterBottomSheet";
import { Bar, BarChart, Legend, RadialBar, RadialBarChart } from "recharts";
import ConversationCard from "./ConversationCard";
import SearchIcon from "../../../assets/images/icon_search.svg?react";
import SearchBottomSheet from "./SearchBottomSheet";
import ReportLayout from "../layout";
import Card from "../../../commons/surfaces/Card";
function ReportMainPage() {
  const [searchFilterBottomSheetVisible, setSearchFilterBottomSheetVisible] =
    useState(false);
  const [searchBottomSheetVisible, setSearchBottomSheetVisible] =
    useState(false);
  const [meditationModalVisible, setMeditationModalVisible] = useState(false);

  const data = [
    {
      name: "Joy",
      joy: 4000,
    },
    {
      name: "Sadness",
      count: 3000,
    },
    {
      name: "Anger",
      count: 2000,
    },
    {
      name: "Surprise",
      count: 2000,
    },
    {
      name: "Fear",
      count: 2000,
    },
    {
      name: "Disgust",
      count: 2000,
    },
  ];
  return (
    <ReportLayout>
      <Card
        onClick={() => {}}
        title="Storage box management"
        styleType="fill-third/outline-main"
        description={`Let's take a look at your conversation\nrecords together.`}
      />
      <section className="flex flex-col gap-4 p-4 bg-[#ffffff] rounded-lg border border-third mt-5 mb-4">
        <h1 className="text-md font-semibold">Monthly Overview</h1>
        <BarChart width={300} height={200} data={data}>
          <Bar dataKey="joy" fill="#34D399" />
          <Bar dataKey="sadness" fill="#60A5FA" />
          <Bar dataKey="anger" fill="#F87171" />
          <Bar dataKey="surprise" fill="#FBBF24" />
          <Bar dataKey="fear" fill="#A78BFA" />
          <Bar dataKey="disgust" fill="#FB923C" />
          <Legend />
        </BarChart>

        <h1 className="text-md font-semibold mb-2 text-font-color">
          Overall Mood
        </h1>
        <div className="flex items-center justify-between">
          <div className="relative w-24 h-24">
            {(() => {
              const moodData = [
                { name: "Negative", value: 75, fill: "#F97316" },
              ];
              return (
                <>
                  <RadialBarChart
                    width={101}
                    height={101}
                    cx="50%"
                    cy="50%"
                    innerRadius="100%"
                    outerRadius="100%"
                    barSize={10}
                    data={moodData}
                    startAngle={90}
                    endAngle={90 - 360 * (75 / 100)}
                  >
                    {/* <PolarAngleAxis type="number" domain={[0, 100]} tick={false} /> */}
                    <RadialBar background dataKey="value" cornerRadius={8} />
                  </RadialBarChart>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
                    <span className="text-main font-semibold">75%</span>
                    <span className="text-gray-500 text-xs">Negative</span>
                  </div>
                </>
              );
            })()}
          </div>
          <div className="flex gap-2 text-font-color">
            <div className="text-center p-3 border border-gray-200 rounded-md">
              <p className="text-sm">Total Chats</p>
              <p className="text-xl font-semibold ">42</p>
            </div>
            <div className="text-center p-3 border border-gray-200 rounded-md">
              <p className="text-sm">Avg. Duration</p>
              <p className="text-xl font-semibold ">12 min</p>
            </div>
          </div>
        </div>
      </section>

      <Card
        icon={<UmStressImage />}
        title="Your Stress level seems high."
        styleType="fill-white/outline-main"
        description="Talking to someone you trust can lift the weight off your heart"
      />

      <section className="flex flex-col gap-4">
        <h1 className="text-md font-semibold">Recommendations</h1>
        <Card
          icon={<QuestionMarkIcon />}
          title="When anxiety is high"
          description={`Try 10 minutes of daily meditation`}
          styleType="fill-main/outline-main"
          size="large"
          onClick={() => {
            setMeditationModalVisible(true);
          }}
        />

        <Card
          icon={<AngerPersonIcon />}
          title="When anger builds up"
          description={`Release through physical exercise`}
          styleType="fill-main/outline-main"
          size="large"
          onClick={() => {
            setMeditationModalVisible(true);
          }}
        />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-md font-semibold">Conversations</h1>
        <section className="py-2 px-2">
          <div className="flex items-center justify-between gap-2">
            <SearchIcon
              className="block cursor-pointer"
              onClick={() => {
                setSearchBottomSheetVisible(true);
              }}
            />
            <button
              className="flex items-center gap-1 cursor-pointer text-font-color"
              onClick={() => {
                setSearchFilterBottomSheetVisible(true);
              }}
            >
              1일전 · All emotions <ArrowDownIcon />
            </button>
          </div>
          <span className="block text-main">2025.04.29 - 2025.04.29</span>
        </section>
        <ConversationCard />
      </section>
      <SearchFilterBottomSheet
        isOpen={searchFilterBottomSheetVisible}
        onClose={() => {
          setSearchFilterBottomSheetVisible(false);
        }}
      />
      <SearchBottomSheet
        isOpen={searchBottomSheetVisible}
        onClose={() => {
          setSearchBottomSheetVisible(false);
        }}
      />
      <MeditationModal
        isOpen={meditationModalVisible}
        onClose={() => {
          setMeditationModalVisible(false);
        }}
      />
    </ReportLayout>
  );
}
export default ReportMainPage;
