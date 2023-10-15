import { MouseEventHandler } from "react"
import "./Button.scss"

interface ButtonProps {
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
}

export const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}>
        {disabled ? '' : children}
        {disabled && <div className="spinner"></div>}
      </button>
    );
  }