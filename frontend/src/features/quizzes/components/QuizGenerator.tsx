import { useState } from 'react'
import { Card } from '../../../shared/components/ui/Card'
import { DifficultySelector } from './DifficultySelector'
import { GenerateQuizButton } from './GenerateQuizButton'
import { QuestionCountSelector } from './QuestionCountSelector'
import { QuestionTypeSelector } from './QuestionTypeSelector'
import { QuizScopeSelector } from './QuizScopeSelector'
import type { Difficulty } from './types'
import styles from './quizzes.module.css'

export function QuizGenerator({ documents, onGenerate, loading = false }: { documents: Array<{ id: string; title: string }>; onGenerate?: (payload: { documentId: string; numQuestions: number; difficulty: Difficulty }) => void; loading?: boolean }) {
  const [scope, setScope] = useState(documents[0]?.id ?? '')
  const [count, setCount] = useState(5)
  const [type, setType] = useState('mixed')
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium')
  return <Card className={styles.config}><h2>Build a practice quiz</h2><QuizScopeSelector value={scope} documents={documents} onChange={setScope} /><QuestionCountSelector value={count} onChange={setCount} /><QuestionTypeSelector value={type} onChange={setType} /><DifficultySelector value={difficulty} onChange={setDifficulty} /><label className={styles.check}><input type="checkbox" /> Adapt difficulty as I progress</label><div className={styles.generate}><GenerateQuizButton loading={loading} onGenerate={() => scope && onGenerate?.({ documentId: scope, numQuestions: count, difficulty })} /></div></Card>
}
