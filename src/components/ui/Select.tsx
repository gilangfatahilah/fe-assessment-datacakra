import { HTMLAttributes } from "react";

type Option = {
  value: string | number;
  label: string;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  options: Option[];
  value: string | number | null;
  onOptionSelected: (value: string | number) => void;
  label?: string;
  placeholder?: string;
}

const Select = ({
  options,
  value,
  onOptionSelected,
  label,
  placeholder,
  className,
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        value={value !== null ? value : ""}
        onChange={(e) => onOptionSelected(e.target.value)}
        className="w-full appearance-none rounded-md border border-border bg-secondary py-2 px-4 text-sm text-secondary-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
