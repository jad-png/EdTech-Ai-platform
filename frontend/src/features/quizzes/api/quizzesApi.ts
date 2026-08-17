import { apiClient } from '../../../shared/services/apiClient'
import type { QuizAnalytics, QuizAttempt, QuizRecord } from '../components/types'

export const quizzesApi = {
  list() { return apiClient.get<QuizRecord[]>('/quizzes/') },
  generate(payload: { document_id: string; num_questions: number; difficulty: string; topic?: string }) { return apiClient.post<QuizRecord>('/quizzes/generate/', payload) },
  start(id: string) { return apiClient.post<QuizAttempt>(`/quizzes/${id}/start/`) },
  submit(attemptId: string, answers: { question_id: string; selected_option_id: string | null }[]) { return apiClient.post<QuizAttempt>(`/quizzes/attempts/${attemptId}/submit/`, { answers }) },
  history() { return apiClient.get<QuizAttempt[]>('/quizzes/attempts/') },
  analytics() { return apiClient.get<QuizAnalytics>('/quizzes/analytics/') },
}
