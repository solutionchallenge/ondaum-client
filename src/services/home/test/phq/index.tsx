import CautionTypo from "../../components/test/cautiontypo";
import QuestionCard from "../../components/test/questioncard";
import QuestionStepper from "../../components/test/questionstepper";
import StartCard from "../../components/test/startcard";
import TestResultCard from "../../components/test/testresultcard";
import { AnswerGroup } from "../../components/test/answertoggle/group";

export default function PHQ() {
  return (
    <>
      <main className="mt-16 mb-16">
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
      </main>
    </>
  );
}
