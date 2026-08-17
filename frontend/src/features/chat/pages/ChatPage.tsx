import { useEffect, useMemo, useState } from 'react'
import { Card } from '../../../shared/components/ui/Card'
import { chatApi } from '../api/chatApi'
import { ChatHeader } from '../components/ChatHeader'
import { ChatInput } from '../components/ChatInput'
import { ChatMessageList } from '../components/ChatMessageList'
import { ChatSidebar } from '../components/ChatSidebar'
import { getConversationTitle } from '../components/chatUtils'
import type { ChatMessage, Conversation } from '../components/types'
import styles from '../components/chat.module.css'

function mapMessages(conversation: Conversation): ChatMessage[] {
  return conversation.messages.map((message) => ({
    id: message.id,
    role: message.role === 'USER' ? 'user' : 'assistant',
    content: message.content,
    timestamp: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }))
}

export function ChatPage() {
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [scope, setScope] = useState('All documents')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    async function load() {
      try {
        const { data } = await chatApi.listConversations()
        setConversations(data)
        const current = data[0] ?? (await chatApi.createConversation()).data
        if (!data[0]) setConversations([current])
        setConversation(current)
        setMessages(mapMessages(current))
      } catch {
        setError('Unable to load your conversations.')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])
  const scopes = useMemo(() => ['All documents', ...conversations.filter((item) => item.document).map((item) => item.document as string)], [conversations])
  async function send(content: string) {
    if (!conversation) return
    setError('')
    setIsTyping(true)
    setMessages((current) => [...current, { id: `local-${Date.now()}`, role: 'user', content, timestamp: 'Now' }])
    try {
      const { data } = await chatApi.sendMessage(conversation.id, content)
      setMessages((current) => [...current, { id: `assistant-${Date.now()}`, role: 'assistant', content: data.answer, timestamp: 'Now', citations: data.sources.map((source, index) => ({ id: source.id ?? String(index), label: `Source ${index + 1}`, page: source.page_number })) }])
    } catch {
      setError('Unable to send your message.')
    } finally {
      setIsTyping(false)
    }
  }

  async function createNewChat() {
    setError('')
    setIsCreating(true)
    try {
      const { data } = await chatApi.createConversation()
      setConversations((current) => [data, ...current])
      setConversation(data)
      setMessages([])
    } catch {
      setError('Unable to start a new conversation.')
    } finally {
      setIsCreating(false)
    }
  }

  function selectConversation(selected: Conversation) {
    setConversation(selected)
    setMessages(mapMessages(selected))
  }

  return (
    <div className={styles.layout}>
      <ChatSidebar conversations={conversations} activeConversationId={conversation?.id} isLoading={loading} isCreating={isCreating} onNewChat={createNewChat} onSelect={selectConversation} />
      <Card className={styles.main}>
        <ChatHeader title={conversation ? getConversationTitle(conversation) : undefined} scope={scope} scopes={scopes} onScopeChange={setScope} />
        <ChatMessageList messages={messages} isTyping={loading || isTyping} />
        {error && <p role="alert">{error}</p>}
        <ChatInput suggestions={['Summarize this chapter', 'Give me a practical example']} followUps={['Ask a follow-up']} onSend={send} isLoading={isTyping} />
      </Card>
    </div>
  )
}
