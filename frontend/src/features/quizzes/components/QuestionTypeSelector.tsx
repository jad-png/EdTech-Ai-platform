import styles from "./quizzes.module.css";
export function QuestionTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>Question type</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="mixed">Mixed</option>
        <option value="multiple-choice">Multiple choice</option>
        <option value="true-false">True / False</option>
        <option value="open">Open question</option>
      </select>
    </label>
  );
}
