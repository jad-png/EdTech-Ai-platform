import styles from "./dashboard.module.css";
export function ConceptCard({ name, score }: { name: string; score: number }) {
  return (
    <div className={styles.concept}>
      <span className={styles.conceptName}>{name}</span>
      <span className={styles.conceptScore}>{score}% confidence</span>
    </div>
  );
}
