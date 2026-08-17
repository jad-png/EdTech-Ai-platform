import styles from "./quizzes.module.css";
export function QuestionCountSelector({
  value,
  onChange,
}: {
  value: number;
  onChange?: (value: number) => void;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>Question count</span>
      <input
        className={styles.number}
        type="number"
        min="1"
        max="20"
        value={value}
        onChange={(event) => onChange?.(Number(event.target.value))}
      />
    </label>
  );
}
