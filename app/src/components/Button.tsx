import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const variantClass =
    variant === "primary" ? styles.btnPrimary : styles.btnSecondary;
  return (
    <button className={`${styles.btn} ${variantClass}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
