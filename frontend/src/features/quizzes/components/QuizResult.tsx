import { QuestionResult } from './QuestionResult'
import { ScoreCard } from './ScoreCard'
import styles from './quizzes.module.css'
export function QuizResult({ attempt }: { attempt: { percentage: number; total_questions: number; user_answers?: Array<{ question: string; selected_option: string | null; is_correct: boolean }> } }) { return <div className={styles.result}><ScoreCard score={attempt.percentage} total={attempt.total_questions} />{attempt.user_answers?.map((answer) => <QuestionResult key={answer.question} question={answer.question} answer={answer.selected_option ?? 'No answer'} correct={answer.is_correct} explanation="Your result was evaluated by the backend." source="Quiz result" />)}</div> }
