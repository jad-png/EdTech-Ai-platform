import type { QuizQuestion } from "./types";
import styles from "./quizzes.module.css";
export function MultipleChoiceQuestion({
  question,
  value,
  onChange,
}: {
  question: QuizQuestion;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className={styles.options}>
      {question.options?.map((option) => (
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
