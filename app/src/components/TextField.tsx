import { InputHTMLAttributes } from "react";
import "./TextField.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function TextField({ label, error, ...props }: TextFieldProps) {
  return (
    <div className="fieldWrapper">
      {label && <label className="label">{label}</label>}
      <input className={`input ${error ? "inputError" : ""}`} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default TextField;
