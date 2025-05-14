import { RadialBar, RadialBarChart } from "recharts";

import { Bar, Legend } from "recharts";
import CalendarIcon from "../../../../assets/images/icon_calendar.svg?react";

import { DayPicker } from "react-day-picker";
import { BarChart } from "recharts";
import { ReportResponse } from "../../../../api/report/report";

function MontlyOverview({report ,reportDate, setReportDate}: {report?: ReportResponse, reportDate: Date, setReportDate: (date: Date) => void}) {
    const data = [{
        name: report?.emotion_counts?.map((item)=>item.emotion),
        joy: report?.emotion_counts?.find((item)=>item.emotion === 'joy')?.count,
        sadness: report?.emotion_counts?.find((item)=>item.emotion === 'sadness')?.count,
        anger: report?.emotion_counts?.find((item)=>item.emotion === 'anger')?.count,
        surprise: report?.emotion_counts?.find((item)=>item.emotion === 'surprise')?.count,
        fear: report?.emotion_counts?.find((item)=>item.emotion === 'fear')?.count,
        disgust: report?.emotion_counts?.find((item)=>item.emotion === 'disgust')?.count,
      }];


  return (
    <section className="flex flex-col gap-4 p-4 bg-[#ffffff] rounded-lg border border-third mt-5 mb-4">
        <h1 className="font-semibold">Monthly Overview</h1>
        <CalendarIcon/>
        <DayPicker 
        className="dayPicker-monthly"
          selected={reportDate}
          onSelect={setReportDate}
        />
        <BarChart width={window.innerWidth - 60} height={window.innerWidth * 0.5} data={data}>
            <Bar dataKey="joy" fill="#34D399" />
            <Bar dataKey="sadness" fill="#60A5FA" />
            <Bar dataKey="anger" fill="#F87171" />
            <Bar dataKey="surprise" fill="#FBBF24" />
            <Bar dataKey="fear" fill="#A78BFA" />
            <Bar dataKey="disgust" fill="#FB923C" />
            <Legend />
        </BarChart>
        <h1 className="font-semibold mb-2 text-font-color">
          Overall Mood
        </h1>
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-24 h-24">
              <>
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={[{
                negative: report?.average_negative_score ? report?.average_negative_score*100 : 0,
              }]}>
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="negative"
                />
              </RadialBarChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
                  <span className="text-main font-semibold">{report?.average_negative_score ? report?.average_negative_score*100 : '-'}%</span>
                  <span className="text-gray-500 text-xs">Negative</span>
                </div>
              </>
          </div>
          <div className="flex gap-2 text-font-color">
            <div className="text-center p-3 border border-gray-200 rounded-md">
              <p className="text-sm">Total Chats</p>
              <p className="text-xl font-semibold ">{report?.total_chat_count || '-'}</p>
            </div>
            <div className="text-center p-3 border border-gray-200 rounded-md">
              <p className="text-sm">Avg. Duration</p>
              <p className="text-xl font-semibold ">{report?.average_chat_duration || '-'}</p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default MontlyOverview;
