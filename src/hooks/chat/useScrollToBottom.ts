import { useEffect } from "react";

export function useScrollToBottom(
  bottomRef: React.RefObject<HTMLElement | null>,
  deps: any[]
) {
  useEffect(() => {
    const container = bottomRef.current?.parentElement;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
