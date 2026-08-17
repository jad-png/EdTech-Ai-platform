import { Card } from "../../../shared/components/ui/Card";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { OpenQuestion } from "./OpenQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import type { QuizQuestion } from "./types";
import styles from "./quizzes.module.css";
export function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: QuizQuestion;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Card className={styles.question}>
      <p className={styles.questionNumber}>Question {question.id}</p>
      <h2>{question.prompt}</h2>
      {question.type === "multiple-choice" ? (
        <MultipleChoiceQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      ) : question.type === "true-false" ? (
        <TrueFalseQuestion value={value} onChange={onChange} />
      ) : (
        <OpenQuestion value={value} onChange={onChange} />
      )}
    </Card>
  );
}
