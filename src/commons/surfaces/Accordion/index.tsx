import { ReactNode, useState } from "react";
import ArrowIcon from "../../../assets/images/icon_arrow_down.svg?react";

type Category = {
    icon: ReactNode;
    label: string;
  };
  
  interface AccordionProps{
    item:Category;
    children: ReactNode;
  }

function Accordion({item, children}:AccordionProps){
    const [expanded, setExpanded] = useState<string>();
  
    return(
          <article key={item.label} className={`bg-white rounded-xl shadow-sm p-4`}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpanded((prev) => (prev === item.label ? undefined : item.label))}
            >
              <div className="flex items-center space-x-2">
                {item.icon && item.icon}
                <span className="font-semibold text-gray-800">{item.label}</span>
              </div>
            <span className="block text-gray-400 text-xl">{expanded===item.label ? <ArrowIcon /> : <ArrowIcon className="-rotate-90"/>}</span>
            </div>
            {expanded===item.label && 
            <div className="pt-6 mt-5 border-t border-gray-1">
                {children}
            </div>
            }
          </article>
    )
}
export default Accordion;