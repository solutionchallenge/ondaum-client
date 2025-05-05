import { useState } from "react";
import CautionTypo from "../../components/test/cautiontypo";
import QuestionCard from "../../components/test/questioncard";
import QuestionStepper from "../../components/test/questionstepper";
import StartCard from "../../components/test/startcard";
import TestResultCard from "../../components/test/testresultcard";
import { AnswerGroup } from "../../components/test/answertoggle/group";
import SolutionGroup from "../../components/test/solutioncard/group";
import SolutionModal from "../../components/test/solutionmodal";

export default function PHQ() {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(
    null
  );
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  return (
    <>
      <main className="mt-16 mb-16 bg-white">
        <QuestionStepper currentStep={2} totalSteps={7} />
        <QuestionCard
          questionText={
            <>
              Feeling nervous, <br /> anxious, on edge
            </>
          }
          currentStep={2}
          totalSteps={7}
        />
        <AnswerGroup />
        <StartCard type="phq" />
        <CautionTypo />
        <TestResultCard type="PSS" score={23} />
        <TestResultCard type="PHQ-9" score={23} />
        {showSolutionModal && (
          <SolutionModal onClose={() => setShowSolutionModal(false)} />
        )}
        {/* 하위 컴포넌트에 prop 전달 */}
        <SolutionGroup
          type="PHQ-9"
          result="Severe"
          selectedId={selectedSolutionId}
          onSelect={setSelectedSolutionId}
          openSolutionModal={() => setShowSolutionModal(true)}
        />
      </main>
    </>
  );
}
