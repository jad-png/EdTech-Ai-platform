import { Card } from "../../../shared/components/ui/Card";
import { AnswerExplanation } from "./AnswerExplanation";
import { SourceReference } from "./SourceReference";
import styles from "./quizzes.module.css";
export function QuestionResult({
  question,
  answer,
  correct,
  explanation,
  source,
}: {
  question: string;
  answer: string;
  correct: boolean;
  explanation: string;
  source: string;
}) {
  return (
    <Card className={styles.resultItem}>
      <h3>
        {correct ? "✓" : "○"} {question}
      </h3>
      <p>Your answer: {answer}</p>
      <AnswerExplanation>{explanation}</AnswerExplanation>
      <SourceReference label={source} />
    </Card>
  );
}
