import CautionIcon from "../../../../assets/images/test/icon_caution.svg?react";

const CautionTypo = () => {
  return (
    <div className="flex w-full px-6 py-3 pb-6 gap-2">
      <div className="w-8 h-8 shrink-0">
        <CautionIcon />
      </div>
      <p className="text-sm sm:text-base text-font-color leading-snug">
        This is not a diagnosis, but a simple check-in. If needed, we'll guide
        you to support resources.
      </p>
    </div>
  );
};

export default CautionTypo;
