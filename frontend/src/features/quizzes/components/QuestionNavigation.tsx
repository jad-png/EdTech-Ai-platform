import styles from "./quizzes.module.css";
export function QuestionNavigation({
  total,
  current,
  answered,
  onSelect,
}: {
  total: number;
  current: number;
  answered: number[];
  onSelect?: (index: number) => void;
}) {
  return (
    <nav className={styles.navGrid} aria-label="Question navigation">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          className={`${styles.navDot} ${index === current ? styles.navDotActive : ""} ${answered.includes(index) ? styles.navDotDone : ""}`}
          type="button"
          onClick={() => onSelect?.(index)}
          aria-label={`Go to question ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
    </nav>
  );
}
