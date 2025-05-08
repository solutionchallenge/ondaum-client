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
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

export default function PHQ() {
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
          <StartCard type="phq" />
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
              totalSteps={9}
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
              totalSteps={9}
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
          <TestResultCard
            type="PHQ-9"
            score={answers.reduce((sum, val) => sum + val, 0)}
          />
          <div className="justify-start mb-3 text-font-color text-xl font-bold font-pretendard leading-7">
            What can you do next?
          </div>
          <SolutionGroup
            type="PHQ-9"
            score={answers.reduce((sum, val) => sum + val, 0)}
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
