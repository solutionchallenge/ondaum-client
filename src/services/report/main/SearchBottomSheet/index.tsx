import BottomSheet from "../../../../commons/feedback/BottomSheet";
import Button from "../../../../commons/inputs/Button";
import { useState } from "react";
import TextField from "../../../../commons/inputs/TextField";
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
      <section>
        <TextField
          onSend={() => {}}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </section>
    </BottomSheet>
  );
}
