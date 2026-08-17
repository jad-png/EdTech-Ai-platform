import styles from "./quizzes.module.css";
export function AnswerExplanation({ children }: { children: string }) {
  return (
    <div className={styles.explanation}>
      <strong>Why this matters</strong>
      <br />
      {children}
    </div>
  );
}
