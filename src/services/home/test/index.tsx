import { useEffect, useState } from "react";
import { AnswerGroup } from "./AnswerToggle/group";
import CautionTypo from "./CautionTypo";
import QuestionCard from "./QuestionCard";
import QuestionStepper from "./QuestionStepper";
import SolutionCard from "./SolutionCard";
import StartCard from "./StartCard";
import TestResultCard from "./TestResultCard";
import { getDiagnosis } from "../../../api/test/diagnosis";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [results, setResults] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scoring, setScoring] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(
    null
  );
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getDiagnosis({ diagnosis_id: type });
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

  return (
    <main className="flex flex-col min-h-screen items-center bg-white mb-16">
      {step === "intro" && (
        <div className="mt-16 flex flex-col items-center">
          <StartCard type={type} />
          <CautionTypo />
          <div className="w-full px-4">
            <button
              onClick={() => setStep("question")}
              className="w-full h-14 bg-main rounded-[20px] text-white font-semibold text-base font-pretendard leading-snug"
            >
              Start the Test
            </button>
          </div>
        </div>
      )}

      {step === "question" && questions.length > 0 && (
        <div className="w-full h-[88%] pt-24 flex flex-col items-center justify-between">
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
        <div className="w-full px-5 pt-24">
          <div className="justify-start text-font-color text-xl font-bold font-pretendard leading-7">
            Your Mental Health Check-In Result
          </div>
          {(() => {
            const score = answers.reduce((sum, val) => sum + val, 0);
            return (
              <>
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
              </>
            );
          })()}
          {showSolutionModal && (
            <SolutionModal onClose={() => setShowSolutionModal(false)} />
          )}
        </div>
      )}
    </main>
  );
}
