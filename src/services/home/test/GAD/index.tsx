import { useState } from "react";
import CautionTypo from "../CautionTypo";
import StartCard from "../StartCard";
import QuestionStepper from "../QuestionStepper";
import QuestionCard from "../QuestionCard";
import { AnswerGroup } from "../AnswerToggle/group";
import TestResultCard from "../TestResultCard";
import SolutionCard from "../SolutionCard";
import SolutionModal from "../SolutionModal";

const questions = [
  "Feeling nervous, anxious, or on edge",
  "Have you found it hard to stop or control your worries?",
  "Have you worried excessively about different things?",
  "Have you had difficulty relaxing or calming down?",
  "Have you felt so restless that it was hard to stay still?",
  "Have you been easily irritated or become annoyed more than usual?",
  "Have you felt afraid, as if something terrible might happen soon?",
];

export default function GAD() {
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
          <StartCard type="gad" />
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
              totalSteps={7}
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
              totalSteps={7}
            />
          </div>
          <AnswerGroup onSelect={handleAnswer} questionIndex={currentIndex} />
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
                <TestResultCard type="GAD-7" score={score} />
                <div className="justify-start mb-3 text-font-color text-xl font-bold font-pretendard leading-7">
                  What can you do next?
                </div>
                <SolutionCard
                  type="GAD-7"
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
