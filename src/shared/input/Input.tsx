import { ChangeEvent, KeyboardEventHandler } from "react";
import { CSSProperties } from "react";
import "./Input.scss";

interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties | undefined;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  error,
  helperText,
  onKeyDown,
  onChange,
  style,
  placeholder,
}) => {
  return (
    <div className="input-group">
      <label className={error ? "invalid" : ""}>{label}</label>
      <input
        className={`custom-input ${error ? "invalid" : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
      {error && <p>&#9888;  {helperText}</p>}
    </div>
  );
};
