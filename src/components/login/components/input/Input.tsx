import { KeyboardEventHandler } from "react";
import "./Input.scss"

interface InputProps {
    label: string;
    type: string;
    value: string;
    error: boolean;
    helperText: string;
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    onChange: (value: string) => void;
    disabled: boolean;
}

export const Input: React.FC<InputProps> = ({ label, type, value, error, helperText, onKeyDown, onChange, disabled }) => {
    return (
      <div className="input-group">
        <label>{label}</label>
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
        {error && <p>{helperText}</p>}
      </div>
    );
}