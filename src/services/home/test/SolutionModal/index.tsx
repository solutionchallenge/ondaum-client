import IconModal from "../../../../assets/images/test/solution/icon_modal.svg?react";
import SolutionModalItem from "./item";

const SolutionModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md px-6 py-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center gap-6">
        <div className="flex flex-row items-center w-full px-2">
          <div className="w-full flex flex-col items-start gap-2">
            <h2 className="text-xl font-bold text-font-color text-left leading-7 font-pretendard">
              Need support?
            </h2>
            <p className="text-sm text-gray-600 text-left leading-tight font-pretendard">
              Nearby clinics
              <br />
              are here for you.
            </p>
          </div>
          <IconModal className="w-48 h-auto" />
        </div>
        {/* 더미아이템 */}
        <SolutionModalItem
          title="Calm Mind Psychiatry"
          distance="5 min walk"
          time="09:00–18:00"
        />
        <SolutionModalItem
          title="Calm Mind Psychiatry"
          distance="5 min walk"
          time="09:00–18:00"
        />
        <SolutionModalItem
          title="Calm Mind Psychiatry"
          distance="5 min walk"
          time="09:00–18:00"
        />
        <div className="w-full flex flex-col gap-3">
          <div className="text-center justify-start text-font-color2 text-xs font-normal font-pretendard leading-none">
            You deserve support — and it's close by.
          </div>
          <button
            onClick={onClose}
            className="w-full h-12 bg-main rounded-[20px] text-white font-semibold text-base font-pretendard leading-snug"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;
