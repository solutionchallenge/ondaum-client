import SearchIcon from "../../../../assets/images/icon_search.svg?react";
import ArrowDownIcon from "../../../../assets/images/icon_arrow_down.svg?react";
import dayjs from "dayjs";
import SearchBottomSheet from "./SearchBottomSheet";
import SearchFilterBottomSheet from "./SearchFilterBottomSheet";
import ConversationCard from "./ConversationCard";
import EmptyConversation from "./EmtpyConversation";
import { useEffect, useState } from "react";
import { getChats } from "../../../../api/report/chats";
import { ChatResponse } from "../../../../api/report/chats";

function Conversations() {
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [searchFilterBottomSheet, setSearchFilterBottomSheet] = useState({
    isVisible: false,
    filter: {
      date: "3",
      emotion: ["joy", "sadness", "anger", "surprise", "fear", "disgust"],
    },
  });
  const [searchBottomSheet, setSearchBottomSheet] = useState({
    isVisible: false,
    keyword: "",
  });

  const fetchChats = async () => {
    const response = await getChats({
      datetime_gte: dayjs()
        .startOf("hour")
        .subtract(Number(searchFilterBottomSheet.filter.date), "day")
        .toISOString(),
      datetime_lte: dayjs().endOf("hour").toISOString(),
      dominant_emotions: searchFilterBottomSheet.filter.emotion.join(","),
      matching_content: searchBottomSheet.keyword,
    });
    setChats(response.chats);
  };
  useEffect(() => {
    fetchChats();
  }, [
    searchFilterBottomSheet.filter.date,
    searchFilterBottomSheet.filter.emotion,
    searchBottomSheet.keyword,
  ]);

  return (
    <>
      <section className="flex flex-col gap-4 mt-4 mb-4">
        <h1 className="font-semibold">Conversations</h1>
        <section className="py-2 px-2">
          <div className="flex items-center justify-between gap-2">
            <SearchIcon
              className="block cursor-pointer"
              onClick={() => {
                setSearchBottomSheet({ ...searchBottomSheet, isVisible: true });
              }}
            />
            <button
              className="flex items-center gap-1 cursor-pointer text-font-color text-right"
              onClick={() => {
                setSearchFilterBottomSheet({
                  ...searchFilterBottomSheet,
                  isVisible: true,
                });
              }}
            >
              {searchFilterBottomSheet.filter.date} days ago ·{" "}
              {searchFilterBottomSheet.filter.emotion.length === 5 && <br />}
              {searchFilterBottomSheet.filter.emotion.length === 6
                ? "all emotions"
                : searchFilterBottomSheet.filter.emotion.join(",")}{" "}
              <ArrowDownIcon />
            </button>
          </div>
          <span className="block text-main">
            {dayjs()
              .subtract(Number(searchFilterBottomSheet.filter.date), "day")
              .format("YYYY.MM.DD")}{" "}
            - {dayjs().format("YYYY.MM.DD")}
          </span>
        </section>
        {chats.length > 0 ? (
          chats.map((item) => (
            <ConversationCard key={item?.session_id} item={item} />
          ))
        ) : (
          <EmptyConversation />
        )}
      </section>

      <SearchFilterBottomSheet
        item={searchFilterBottomSheet}
        updateItem={(item) => setSearchFilterBottomSheet(item)}
      />
      <SearchBottomSheet
        item={searchBottomSheet}
        updateItem={(item) => setSearchBottomSheet(item)}
      />
    </>
  );
}
export default Conversations;
