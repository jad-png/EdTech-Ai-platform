import styles from "./quizzes.module.css";
export function TrueFalseQuestion({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className={styles.options}>
      {["True", "False"].map((option) => (
        <button
          className={`${styles.option} ${value === option ? styles.optionSelected : ""}`}
          type="button"
          key={option}
          onClick={() => onChange?.(option)}
        >
          <span aria-hidden="true">{value === option ? "●" : "○"}</span>
          {option}
        </button>
      ))}
    </div>
  );
}
