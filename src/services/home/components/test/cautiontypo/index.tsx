import CautionIcon from "../../../../../assets/images/test/icon_caution.svg?react";

const CautionTypo = () => {
  return (
    <div className="flex px-4 items-center gap-2">
      <CautionIcon />
      <p className="text-sm sm:text-base text-font-color leading-snug">
        This is not a diagnosis, but a simple check-in. If needed, we'll guide
        you to support resources.
      </p>
    </div>
  );
};

export default CautionTypo;
