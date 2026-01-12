import { ButtonHTMLAttributes } from 'react';
import styles from './SubmitButton.module.css';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

function SubmitButton({ children, isLoading, disabled, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={styles.submitBtn}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loading}>
          <span className={styles.spinner}></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default SubmitButton;
