import { apiClient } from '../../../shared/services/apiClient'
import type { ChatResponse, Conversation } from '../components/types'

export const chatApi = {
  listConversations() { return apiClient.get<Conversation[]>('/chat/') },
  createConversation(document: string | null = null) { return apiClient.post<Conversation>('/chat/', { document }) },
  detail(id: string) { return apiClient.get<Conversation>(`/chat/${id}/`) },
  sendMessage(id: string, content: string) { return apiClient.post<ChatResponse>(`/chat/${id}/messages/`, { content }) },
}
