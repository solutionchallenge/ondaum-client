import { ReactNode } from "react";
import CloseIcon from "../../../assets/images/icon_close.svg?react";

interface BottomSheetProps {
  backdrop?: boolean;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function BottomSheet({
  backdrop = true,
  isOpen,
  title,
  onClose,
  children,
  footer,
}: BottomSheetProps) {
  return (
    isOpen && (
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center ${backdrop ? "bg-black bg-opacity-40" : ""}`}
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex mb-4">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
            <span className="block w-full text-font-color text-center text-xl font-bold leading-7">
              {title}
            </span>
          </div>
          {children}
          {footer && footer}
        </div>
      </div>
    )
  );
}
