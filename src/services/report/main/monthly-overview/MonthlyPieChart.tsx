import { Cell, Pie, PieChart } from "recharts";
import { ReportResponse } from "../../../../api/report/report";

function MonthlyPieChart({ report }: { report?: ReportResponse }) {
  const pieData = [
    {
      name: "positive",
      color: "#FFD900",
      value: report?.average_positive_score
        ? report?.average_positive_score * 100
        : 0,
    },
    {
      name: "negative",
      color: "#29389E",
      value: report?.average_negative_score
        ? report?.average_negative_score * 100
        : 0,
    },
    {
      name: "neutral",
      color: "#9E9E9E",
      value: report?.average_neutral_score
        ? report?.average_neutral_score * 100
        : 0,
    },
  ];

  const dummyPieData = [
    {
      name: "N/A",
      color: "#e5e7eb",
      value: 100,
    },
  ];

  const renderValueLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, innerRadius, index } = props;
    const RADIAN = Math.PI / 180;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight="bold"
        fontSize={11}
        textAnchor={x > cx ? "start" : "middle"}
        dominantBaseline="central"
      >
        {data[index].name}
      </text>
    );
  };
  const data = report?.total_chat_count ? pieData : dummyPieData;
  return (
    <PieChart width={120} height={120}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderValueLabel}
        outerRadius={60}
        animationDuration={200}
        dataKey="value"
      >
        {data.map((item, index) => (
          <Cell key={`cell-${index}`} fill={item.color} />
        ))}
      </Pie>
    </PieChart>
  );
}
export default MonthlyPieChart;
