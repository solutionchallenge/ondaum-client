import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ChatItem from "./serveritem";

const chatContents = [
  [{ text: "Hello, do you have any concerns?", bold: false }],
  [
    { text: "Would you like to ", bold: false },
    { text: "pick something", bold: true },
    { text: " you like during the conversation or test?", bold: false },
  ],
  [
    { text: "If you choose Chat, ", bold: false },
    { text: "I will talk to you and find a solution.", bold: true },
  ],
  [
    { text: "If you choose Test, ", bold: false },
    { text: "I will give you the tests you want.", bold: true },
  ],
];

export default function InitChatList({ onFinish }: { onFinish?: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < chatContents.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1000); // 1초에 하나씩

      return () => clearTimeout(timer);
    } else if (visibleCount === chatContents.length && onFinish) {
      onFinish();
    }
  }, [visibleCount, onFinish]);

  return (
    <div className="flex flex-col gap-3">
      {chatContents.slice(0, visibleCount).map((contents, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatItem contents={contents} />
        </motion.div>
      ))}
    </div>
  );
}
