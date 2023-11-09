import { CSSProperties, ChangeEvent, KeyboardEventHandler } from "react";
import "./../input/Input.scss";
import "./AutoComplete.scss";

interface AutoCompleteProps {
  label?: string;
  type?: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties | undefined;
  placeholder?: string;
  name?: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  label,
  type = "text",
  value,
  error,
  helperText,
  onKeyDown,
  onChange,
  style,
  placeholder,
  name
}) => {
  return (
    <div className="input-group">
      <label className={error ? "invalid" : ""}>{label}</label>
      <input
        className={`custom-input ${error ? "invalid" : ""}`}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
      {error && <p>&#9888;  {helperText}</p>}
    </div>
  );
};
