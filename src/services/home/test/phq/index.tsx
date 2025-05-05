import CautionTypo from "../../components/test/cautiontypo";
import QuestionStepper from "../../components/test/questionstepper";
import StartCard from "../../components/test/startcard";

function PhqPage() {
  return (
    <>
      <main className="w-full h-screen pb-44 pt-16">
        <QuestionStepper currentStep={3} totalSteps={10} />
        <StartCard type="phq" />
        <CautionTypo />
      </main>
    </>
  );
}

export default PhqPage;
