import styles from "./quizzes.module.css";
export function QuizHeader({
  title,
  difficulty,
}: {
  title: string;
  difficulty: string;
}) {
  return (
    <div className={styles.quizHeader}>
      <h2>{title}</h2>
      <span className="ui-badge ui-badge--accent">{difficulty}</span>
    </div>
  );
}
