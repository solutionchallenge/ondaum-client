import { useEffect, useState } from "react";
import { AnswerGroup } from "./AnswerToggle/group";
import CautionTypo from "./CautionTypo";
import QuestionCard from "./QuestionCard";
import QuestionStepper from "./QuestionStepper";
import SolutionCard from "./SolutionCard";
import StartCard from "./StartCard";
import TestResultCard from "./TestResultCard";
import {
  getDiagnosis,
  postDiagnosisResult,
  getDiagnosisResult,
} from "../../../api/test/diagnosis";
import SolutionModal from "./SolutionModal";
import QuestionStepperText from "./QuestionStepperText";

export default function DiagnosisTest({
  type,
}: {
  type: "phq-9" | "gad-7" | "pss";
}) {
  const [step, setStep] = useState<"intro" | "question" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questions, setQuestions] = useState<
    { question: string; answers: { score: number; text: string }[] }[]
  >([]);

  const [results, setResults] = useState<any[]>([]);

  const [scoring, setScoring] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(
    null
  );
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [, setResultId] = useState<number | null>(null);
  const [postedResult, setPostedResult] = useState<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getDiagnosis({ paper_id: type });
        setQuestions(
          data.questions.map((q) => ({
            question: q.question,
            answers: q.answers.map((a) => ({ score: a.score, text: a.text })),
          }))
        );
        setResults(data.results);
        setScoring(data.scoring);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, [type]);

  const handleAnswer = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStep("result");
      }
    }, 400);
  };

  useEffect(() => {
    if (step !== "result" || results.length === 0) return;

    const score = answers.reduce((sum, val) => sum + val, 0);
    const matched = results.find((r) => score >= r.min && score <= r.max);

    if (matched) {
      postDiagnosisResult({
        diagnosis: type,
        result_critical: matched.critical,
        result_description: matched.description,
        result_name: matched.name,
        result_score: score,
        total_score: scoring.max,
      })
        .then(async (res) => {
          setResultId(res.id);
          const result = await getDiagnosisResult(res.id);
          setPostedResult(result);
        })
        .catch((e) => console.error("Failed to post diagnosis result:", e));
    }
  }, [answers, results, scoring.max, step, type]);

  return (
    <main className="pt-16 mt-5">
      {step === "intro" && (
        <div className="z-10 flex flex-col items-center">
          <StartCard type={type} />
          <CautionTypo />
          <div className="w-full px-4">
            <button
              onClick={() => setStep("question")}
              className="sticky z-10 bottom-0 w-full h-14 bg-main rounded-[20px] text-white font-semibold text-base font-pretendard leading-snug"
            >
              Start the Test
            </button>
          </div>
          <div className="absolute -z-10 bottom-0 w-full h-72 bg-gradient-to-b from-[#fffaf4]/20 to-[#f57c00]/20 pointer-events-none" />
        </div>
      )}

      {step === "question" && questions.length > 0 && (
        <div className="sticky h-screen top-0 pb-52 flex flex-col justify-between">
          <div className="w-full">
            <QuestionStepper
              currentStep={currentIndex + 1}
              totalSteps={questions.length}
              onBack={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                  setAnswers((prev) => prev.slice(0, -1));
                } else {
                  history.back();
                }
              }}
            />
            <QuestionStepperText
              currentStep={currentIndex + 1}
              totalSteps={questions.length}
            />
            <QuestionCard
              questionText={questions[currentIndex].question}
              currentStep={currentIndex + 1}
              totalSteps={questions.length}
            />
          </div>
          <AnswerGroup
            onSelect={handleAnswer}
            questionIndex={currentIndex}
            answers={questions[currentIndex].answers.map((a) => ({
              title: a.text,
            }))}
          />
        </div>
      )}

      {step === "result" && (
        <div className="z-10 flex flex-col">
          <div className="justify-start px-5 text-font-color text-xl font-bold font-pretendard leading-7">
            Your Mental Health Check-In Result
          </div>
          {postedResult && (
            <>
              <div className="text-main text-lg font-bold mt-2">
                {postedResult.result_name}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {postedResult.result_description}
              </div>
            </>
          )}
          {(() => {
            const score = answers.reduce((sum, val) => sum + val, 0);
            return (
              <div className="px-5">
                <TestResultCard type={type.toUpperCase()} score={score} />
                <div className="justify-start mb-3 text-font-color text-xl font-bold font-pretendard leading-7">
                  What can you do next?
                </div>
                <SolutionCard
                  type={type.toUpperCase()}
                  score={score}
                  selectedId={selectedSolutionId}
                  onSelect={setSelectedSolutionId}
                  openSolutionModal={() => setShowSolutionModal(true)}
                />
              </div>
            );
          })()}
          <div className="sticky -z-10 bottom-0 w-full h-72 bg-gradient-to-b from-[#fffaf4]/20 to-[#f57c00]/20 pointer-events-none" />
        </div>
      )}
      {showSolutionModal && (
        <SolutionModal onClose={() => setShowSolutionModal(false)} />
      )}
    </main>
  );
}
