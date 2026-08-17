import { StatCard } from './StatCard'
import styles from './dashboard.module.css'
export function StatsGrid({ questions, quizzes, average }: { questions: number; quizzes: number; average: number }) { return <div className={styles.stats}><StatCard label="Documents processed" value="—" trend="Not available yet" /><StatCard label="Questions answered" value={String(questions)} /><StatCard label="Quizzes completed" value={String(quizzes)} /><StatCard label="Average score" value={`${average}%`} /></div> }
