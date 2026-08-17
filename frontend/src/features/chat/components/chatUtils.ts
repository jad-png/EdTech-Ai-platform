import type { Conversation } from './types'

export function getConversationTitle(conversation: Conversation) {
  const firstUserMessage = conversation.messages.find((message) => message.role === 'USER')
  if (firstUserMessage?.content) {
    return firstUserMessage.content.length > 38
      ? `${firstUserMessage.content.slice(0, 38).trim()}…`
      : firstUserMessage.content
  }
  return 'New conversation'
}

export function getRelativeTime(value: string) {
  const elapsed = Date.now() - new Date(value).getTime()
  const minutes = Math.floor(elapsed / 60000)
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return new Date(value).toLocaleDateString([], { month: 'short', day: 'numeric' })
}
