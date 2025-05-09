import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../../assets/images/icon_arrow_down.svg?react";

type Category = {
  icon: ReactNode;
  label: string;
};

interface AccordionProps {
  item: Category;
  children: ReactNode;
}

function Accordion({ item, children }: AccordionProps) {
  const [expanded, setExpanded] = useState<string>();

  return (
    <article key={item.label} className={`bg-white rounded-xl shadow-sm p-4`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() =>
          setExpanded((prev) => (prev === item.label ? undefined : item.label))
        }
      >
        <div className="flex items-center space-x-2">
          {item.icon && item.icon}
          <span className="font-semibold text-gray-800">{item.label}</span>
        </div>
        <span className="block  text-gray-400 text-xl">
          <ArrowIcon
            className={`transition-all duration-500 ${expanded === item.label ? "" : "-rotate-90"}`}
          />
        </span>
      </div>
      {expanded === item.label && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.15 }}
          className="py-6 mt-5 border-t border-gray-1"
        >
          {children}
        </motion.div>
      )}
    </article>
  );
}
export default Accordion;
