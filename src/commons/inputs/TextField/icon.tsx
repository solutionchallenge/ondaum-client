import { ReactNode } from "react";

interface IconInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: ReactNode;
  type?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

function IconInput({
  value,
  onChange,
  icon,
  type = "text",
  name,
  placeholder,
  disabled = false,
  error,
  className = "",
}: IconInputProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-font-color2">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full pl-10 pr-3 py-2 rounded-md border bg-white ${
          error ? "border-red-500" : "border-gray-300"
        } text-sm focus:outline-none focus:ring-1 focus:ring-main hover:border-main disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default IconInput;
