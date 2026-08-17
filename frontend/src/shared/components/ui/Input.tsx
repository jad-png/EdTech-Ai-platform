import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const message = error ?? helperText;
  return (
    <div className="ui-field">
      <label className="ui-field__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={`ui-input${error ? " ui-input--error" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? `${inputId}-message` : undefined}
        {...props}
      />
      {message && (
        <p
          id={`${inputId}-message`}
          className={`ui-field__message${error ? " ui-field__message--error" : ""}`}
          role={error ? "alert" : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}
