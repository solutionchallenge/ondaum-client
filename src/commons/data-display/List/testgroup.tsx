import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ServerItem from "./serveritem";

const chatContents = [
  [{ text: "Hello, do you have any concerns?", bold: false }],
  [
    {
      text: "I can help you with a few assessments that may aid in evaluating your mental health.",
      bold: false,
    },
  ],
  [{ text: "You can choose from the following", bold: false }],
];

export default function TestChatList({ onFinish }: { onFinish?: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount]);

  useEffect(() => {
    if (visibleCount < chatContents.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1000);

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
          <ServerItem contents={contents} />
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
