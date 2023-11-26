import { ChangeEvent, KeyboardEventHandler } from "react";
import { CSSProperties } from "react";
import "./Input.scss";
import InputMask from 'react-input-mask';

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
  name?: string;
  mask?: string;
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
  name,
  mask
}) => {

    const inputElement = mask ? (
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`custom-input ${error ? "invalid" : ""}`}
      type={type}
      name={name}
      placeholder={placeholder}
      style={style}
      >
    </InputMask>
  ) : (
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
  );

  return (
    <div className="input-group">
      <label className={error ? "invalid" : ""}>{label}</label>
      {inputElement}
      {error && <p>&#9888;  {helperText}</p>}
    </div>
  );
};
