import { MouseEventHandler } from "react"
import "./Button.scss"

interface ButtonProps {
    variant: string;
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
}

export const Button: React.FC<ButtonProps> = ({ variant, disabled, onClick, children }) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}>
        {children}
      </button>
    );
  }