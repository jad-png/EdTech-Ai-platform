import { Button } from "../../../shared/components/ui/Button";
import styles from "./quizzes.module.css";
export function QuizActions({
  onPrevious,
  onNext,
  isLast = false,
}: {
  onPrevious?: () => void;
  onNext?: () => void;
  isLast?: boolean;
}) {
  return (
    <div className={styles.nav}>
      <Button variant="ghost" type="button" onClick={onPrevious}>
        Previous
      </Button>
      <Button type="button" onClick={onNext}>
        {isLast ? "Finish quiz" : "Next question"}
      </Button>
    </div>
  );
}
