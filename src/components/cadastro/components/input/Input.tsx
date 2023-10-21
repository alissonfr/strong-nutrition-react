import { KeyboardEventHandler } from "react";
import { CSSProperties } from "react";
import "./Input.scss";

interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onChange: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties | undefined;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  error,
  helperText,
  onKeyDown,
  onChange,
  disabled,
  style,
  placeholder,
}) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        style={style}
      />
      {error && <p>&#9888; {helperText}</p>}
    </div>
  );
};
