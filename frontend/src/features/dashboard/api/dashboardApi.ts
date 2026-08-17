import { apiClient } from '../../../shared/services/apiClient'
import type { QuizAnalytics } from '../../quizzes/components/types'

export const dashboardApi = { analytics() { return apiClient.get<QuizAnalytics>('/quizzes/analytics/') } }
