import { useState } from "react";
import CautionTypo from "../../components/test/cautiontypo";
import StartCard from "../../components/test/startcard";
import QuestionStepper from "../../components/test/questionstepper";
import QuestionCard from "../../components/test/questioncard";
import { AnswerGroup } from "../../components/test/answertoggle/group";
import TestResultCard from "../../components/test/testresultcard";
import SolutionGroup from "../../components/test/solutioncard/group";
import SolutionModal from "../../components/test/solutionmodal";

const questions = [
  "Upset by unexpected events?",
  "Felt unable to control important things?",
  "Felt nervous or stressed?",
  "Confident handling personal problems?",
  "Felt things were going your way?",
  "Felt overwhelmed by tasks?",
  "Controlled daily irritations?",
  "Felt in control of things?",
  "Angry about things beyond control?",
  "Felt problems were piling up?",
];

export default function PSS() {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(
    null
  );
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const [step, setStep] = useState<"intro" | "question" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStep("result");
      }
    }, 400); // delay in milliseconds
  };

  return (
    <main className="flex flex-col min-h-screen items-center bg-white mb-16">
      {step === "intro" && (
        <div className="mt-16 flex flex-col items-center">
          <StartCard type="pss" />
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

      {step === "question" && (
        <div className="w-full h-[88%] pt-24 flex flex-col items-center justify-between">
          <div className="w-full">
            <QuestionStepper
              currentStep={currentIndex + 1}
              totalSteps={10}
              onBack={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                  setAnswers((prev) => prev.slice(0, -1));
                } else {
                  history.back();
                }
              }}
            />
            <QuestionCard
              questionText={questions[currentIndex]}
              currentStep={currentIndex + 1}
              totalSteps={10}
            />
          </div>
          <AnswerGroup
            onSelect={handleAnswer}
            questionIndex={currentIndex}
            type="PSS"
          />
        </div>
      )}

      {step === "result" && (
        <div className="w-full px-5 pt-24">
          <div className="justify-start text-font-color text-xl font-bold font-pretendard leading-7">
            Your Mental Health Check-In Result
          </div>
          <TestResultCard
            type="PSS"
            score={answers.reduce((sum, val, idx) => {
              const reverseIndices = [3, 4, 6, 7];
              return sum + (reverseIndices.includes(idx) ? 4 - val : val);
            }, 0)}
          />
          <div className="justify-start mb-3 text-font-color text-xl font-bold font-pretendard leading-7">
            What can you do next?
          </div>
          <SolutionGroup
            type="PSS"
            score={answers.reduce((sum, val, idx) => {
              const reverseIndices = [3, 4, 6, 7];
              return sum + (reverseIndices.includes(idx) ? 4 - val : val);
            }, 0)}
            selectedId={selectedSolutionId}
            onSelect={setSelectedSolutionId}
            openSolutionModal={() => setShowSolutionModal(true)}
          />
          {showSolutionModal && (
            <SolutionModal onClose={() => setShowSolutionModal(false)} />
          )}
        </div>
      )}
    </main>
  );
}
