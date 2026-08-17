import styles from "./quizzes.module.css";
export function OpenQuestion({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <textarea
      className={styles.textarea}
      value={value ?? ""}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder="Write your answer here…"
      aria-label="Open question answer"
    />
  );
}
