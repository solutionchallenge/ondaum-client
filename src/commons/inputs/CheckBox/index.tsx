import { useEffect, useState } from "react";
import CheckedIcon from "../../../assets/images/icon_check_filled.svg?react";
import UnCheckedIcon from "../../../assets/images/icon_check_empty.svg?react";

interface CheckBoxProps {
  defaultChecked: boolean;
  label: string;
  onChange: (key: string, value: boolean) => void;
}

function CheckBox({ label, onChange, defaultChecked }: CheckBoxProps) {
  const [checked, setChecked] = useState<boolean>();

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const check = (key: string, value: boolean) => {
    setChecked(value);
    onChange(key, value);
  };
  return (
    <label
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => {
        check(label, !checked);
      }}
    >
      {checked ? <CheckedIcon /> : <UnCheckedIcon />}
      <span className="text-font-color">{label}</span>
    </label>
  );
}
export default CheckBox;
