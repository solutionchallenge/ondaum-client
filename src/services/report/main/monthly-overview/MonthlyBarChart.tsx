import { ReportResponse } from "../../../../api/report/report";
import { Bar, BarChart, Cell, ResponsiveContainer } from "recharts";
import { EmotionIcon } from "../../../../commons/data-display/EmotionIcon";
import { JSX } from "react";

export const BarChartLegend = [
  {
    name: "joy",
    label: "Joy",
    icon: <EmotionIcon emotion="joy" className="w-4 h-4" />,
  },
  {
    name: "sadness",
    label: "Sadness",
    icon: <EmotionIcon emotion="sadness" className="w-4 h-4" />,
  },
  {
    name: "anger",
    label: "Anger",
    icon: <EmotionIcon emotion="anger" className="w-4 h-4" />,
  },
  {
    name: "fear",
    label: "Fear",
    icon: <EmotionIcon emotion="fear" className="w-4 h-4" />,
  },
  {
    name: "surprise",
    label: "Surprise",
    icon: <EmotionIcon emotion="surprise" className="w-4 h-4" />,
  },
  {
    name: "disgust",
    label: "Disgust",
    icon: <EmotionIcon emotion="disgust" className="w-4 h-4" />,
  },
];

function MonthlyChart({ report }: { report?: ReportResponse }) {
  const renderLabel = ({ x, y, width, height, value }: any): JSX.Element => {
    const valid =
      typeof x === "number" &&
      typeof y === "number" &&
      typeof width === "number" &&
      typeof height === "number";

    const labelX = valid ? x + width / 2 : 0;
    const labelY = valid ? y + height - 30 : 0;
    const labelValue = valid ? value : "";

    return (
      <text
        x={labelX}
        y={labelY}
        fill="#fff"
        fontSize={18}
        fontWeight={500}
        textAnchor="middle"
      >
        {labelValue}
      </text>
    );
  };
  const renderBackground = ({ x, width, height, index }: any) => (
    <rect
      x={x}
      y={height}
      width={width}
      height={50}
      fill={barData[index].color}
      rx={2}
      ry={1}
    />
  );

  const barData = [
    {
      name: "joy",
      color: "#FFD900",
      count:
        report?.emotion_counts?.find((item) => item.emotion === "joy")?.count ??
        0,
    },
    {
      name: "sadness",
      color: "#4A90E2",
      count:
        report?.emotion_counts?.find((item) => item.emotion === "sadness")
          ?.count ?? 0,
    },
    {
      name: "anger",
      color: "#274B7A",
      count:
        report?.emotion_counts?.find((item) => item.emotion === "anger")
          ?.count ?? 0,
    },
    {
      name: "fear",
      color: "#5C6BC0",
      count:
        report?.emotion_counts?.find((item) => item.emotion === "fear")
          ?.count ?? 0,
    },
    {
      name: "surprise",
      color: "#CFC5B4",
      count:
        report?.emotion_counts?.find((item) => item.emotion === "surprise")
          ?.count ?? 0,
    },
    {
      name: "disgust",
      color: "#8E837E",
      count:
        report?.emotion_counts?.find((item) => item.emotion === "disgust")
          ?.count ?? 0,
    },
  ];

  return (
    <>
      <ResponsiveContainer
        className="border border-gray-1 rounded-lg py-4"
        width="100%"
        height={window.innerWidth * 0.4}
      >
        <BarChart data={barData}>
          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            label={renderLabel}
            background={renderBackground}
            isAnimationActive={false}
          >
            {barData.map((entry, index) => (
              <Cell
                className="rounded-lg"
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap">
        {BarChartLegend.map((emotion) => (
          <div key={emotion.name} className="w-1/3 flex items-center gap-1">
            <span style={{ fontSize: 20 }}>{emotion.icon}</span>
            <span style={{ fontWeight: 500 }}>{emotion.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
export default MonthlyChart;
