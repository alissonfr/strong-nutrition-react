import { MouseEventHandler, useMemo } from "react"
import "./Button.scss"
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: string;
    startIcon?: OverridableComponent<SvgIconTypeMap>;
    size: "normal" | "large"
    color?: "primary" | "secondary" | "outlined"
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, startIcon, size, color="primary" }) => {
  const StartIcon = useMemo(() => {
    if(!startIcon) return
    const StartIcon = startIcon;
    return <StartIcon className="btn-icon" />;
}, [startIcon]);

    return (
      <button
        type="button"
        onClick={onClick}
        className={`custom-button ${size} ${color}`}>
        {startIcon ? <i>{StartIcon}</i> : ""}
        {children}
      </button>
    );
  }