import { ChangeEvent } from "react";
import "./../input/Input.scss";
import "./Select.scss";

interface SelectProps {
  label?: string;
  value?: any;
  error?: boolean;
  helperText?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: any[];
  optionLabel: string;
  optionValue: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  error,
  helperText,
  onChange,
  options,
  optionLabel,
  optionValue
}) => {
  return (
    <div className="input-group">
      <label className={error ? "invalid" : ""}>{label}</label>
    <select className={`custom-input ${error ? "invalid" : ""}`} onChange={onChange} value={value}>
      <option value="" selected>Selecione...</option>
      {options && options.length > 0 && options.map((option, index) => (
        <option key={index} value={option[optionValue]}>
          {option[optionLabel]}
        </option>
      ))}
    </select>
      {error && <p>&#9888;  {helperText}</p>}
    </div>
  );
};
