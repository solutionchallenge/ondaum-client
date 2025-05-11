import BottomSheet from "../../../../commons/feedback/BottomSheet";
import Button from "../../../../commons/inputs/Button";
import { useState } from "react";
import SearchIcon from "../../../../assets/images/icon_search.svg?react";
import IconInput from "../../../../commons/inputs/TextField/icon";
export default function SearchBottomSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [keyword, setKeyword] = useState("");
  return (
    <BottomSheet
      isOpen={isOpen}
      title="Search Keywords"
      onClose={onClose}
      footer={
        <div className="w-full grid grid-cols-2 gap-2">
          <Button onClick={onClose} color="gray">
            cancel
          </Button>
          <Button onClick={() => {}} color="primary">
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
