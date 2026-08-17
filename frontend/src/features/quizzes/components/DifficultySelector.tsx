import styles from "./quizzes.module.css";
import type { Difficulty } from "./types";
export function DifficultySelector({
  value,
  onChange,
}: {
  value: Difficulty;
  onChange?: (value: Difficulty) => void;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>Difficulty</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange?.(event.target.value as Difficulty)}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
    </label>
  );
}
