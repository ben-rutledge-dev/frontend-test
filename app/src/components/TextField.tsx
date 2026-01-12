import { InputHTMLAttributes } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function TextField({ label, error, ...props }: TextFieldProps) {
  return (
    <div className={styles.fieldWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default TextField;
