import { Card } from "../../../shared/components/ui/Card";
import styles from "./quizzes.module.css";
export function ScoreCard({ score, total }: { score: number; total: number }) {
  return (
    <Card className={styles.score}>
      <span className={styles.scoreValue}>{score}%</span>
      <div>
        <h2>Quiz complete</h2>
        <p>{total} questions reviewed</p>
      </div>
    </Card>
  );
}
