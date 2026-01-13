import { ReactNode, ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const variantClass = variant === "primary" ? "btnPrimary" : "btnSecondary";
  return (
    <button className={`btn ${variantClass}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
