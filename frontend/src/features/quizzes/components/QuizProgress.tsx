import styles from "./quizzes.module.css";
export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className={styles.progress}>
      <div className={styles.progressTop}>
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
