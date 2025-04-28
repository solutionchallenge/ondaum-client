import UmAvatar from "../../commons/data-display/Avatar";
import DateChip from "../../commons/data-display/Chip";
import Card from "../../commons/surfaces/Card";

function HomePage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen pb-44">
      <Card
        onClick={() => {}}
        title="Let's chat with Umi!"
        description="Feel free to share your worries with Umi!"
      />
      <DateChip date={new Date("2025-03-09T16:55:00")} />
      <div className="flex flex-row gap-2">
        <UmAvatar />
        <div className="flex flex-col">
          <div className="justify-start text-main font-semibold font-['Pretendard']">
            Um
          </div>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
