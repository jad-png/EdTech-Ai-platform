export type QuestionType = 'multiple-choice' | 'true-false' | 'open'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export interface QuizQuestion { id: string; type: QuestionType; prompt: string; options?: string[]; answer?: string; explanation?: string }
export interface QuizOption { id: string; text: string; is_correct: boolean }
export interface QuizRecord { id: string; document: string; title: string; difficulty: 'EASY' | 'MEDIUM' | 'HARD'; questions: Array<{ id: string; text: string; explanation: string | null; options: QuizOption[] }>; created_at: string }
export interface QuizAttempt { id: string; quiz: string; score: number; total_questions: number; percentage: number; status: 'IN_PROGRESS' | 'COMPLETED'; duration_seconds: number | null; started_at: string; submitted_at: string | null; user_answers: Array<{ question: string; selected_option: string | null; is_correct: boolean }> }
export interface QuizAnalytics { total_attempts: number; average_score_percentage: number; best_score_percentage: number; worst_score_percentage: number; total_questions_answered: number; total_correct: number; total_incorrect: number }
