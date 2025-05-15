import BottomSheet from "../../../../commons/feedback/BottomSheet";
import Button from "../../../../commons/inputs/Button";
import { useEffect, useState } from "react";
import SearchIcon from "../../../../assets/images/icon_search.svg?react";
import IconInput from "../../../../commons/inputs/TextField/icon";
export default function SearchBottomSheet({
  item,
  updateItem,
}: {
  item: {
    isVisible: boolean;
    keyword: string;
  };
  updateItem: (item: { isVisible: boolean; keyword: string }) => void;
}) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(item.keyword);
  }, [item.isVisible]);

  return (
    <BottomSheet
      isOpen={item.isVisible}
      title="Search Keywords"
      onClose={() => {
        updateItem({ ...item, isVisible: false });
        setKeyword("");
      }}
      footer={
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            onClick={() => {
              updateItem({ ...item, isVisible: false });
              setKeyword("");
            }}
            color="gray"
          >
            cancel
          </Button>
          <Button
            onClick={() => {
              updateItem({ ...item, isVisible: false, keyword: keyword });
            }}
            color="primary"
          >
            check
          </Button>
        </div>
      }
    >
      <section className="mb-8">
        <IconInput
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          icon={<SearchIcon />}
          placeholder="Enter search terms"
        />
      </section>
    </BottomSheet>
  );
}
