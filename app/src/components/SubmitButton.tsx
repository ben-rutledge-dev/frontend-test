import { ButtonHTMLAttributes } from "react";
import "./SubmitButton.css";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

function SubmitButton({
  children,
  isLoading,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="submitBtn"
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="loading">
          <span className="spinner"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default SubmitButton;
