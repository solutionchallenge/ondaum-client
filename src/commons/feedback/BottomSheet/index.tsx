import { ReactNode } from "react";
import CloseIcon from "../../../assets/images/icon_close.svg?react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-50 flex items-end justify-center ${backdrop ? "bg-black bg-opacity-40" : ""}`}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
