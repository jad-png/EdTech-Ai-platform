import { Button } from '../../../shared/components/ui/Button'
import { Dropdown } from '../../../shared/components/ui/Dropdown'
import type { Conversation } from './types'
import { getConversationTitle, getRelativeTime } from './chatUtils'
import styles from './chat.module.css'

interface ChatSidebarProps {
  conversations: Conversation[]
  activeConversationId?: string
  isLoading: boolean
  isCreating: boolean
  onNewChat: () => void
  onSelect: (conversation: Conversation) => void
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  isLoading,
  isCreating,
  onNewChat,
  onSelect,
}: ChatSidebarProps) {
  return (
    <aside className={styles.side} aria-label="Conversations">
      <div className={styles.sidebarHeader}>
        <div>
          <h3>Conversations</h3>
          <p>{isLoading ? 'Loading history…' : `${conversations.length} saved conversation${conversations.length === 1 ? '' : 's'}`}</p>
        </div>
        <Button className={styles.newChat} type="button" variant="secondary" loading={isCreating} onClick={onNewChat}>
          + New Chat
        </Button>
      </div>
      <div className={styles.conversationList}>
        {conversations.length === 0 && !isLoading && <p className={styles.emptySidebar}>Start a conversation to build your study history.</p>}
        {conversations.map((conversation) => (
          <div className={`${styles.conversationItem} ${conversation.id === activeConversationId ? styles.conversationItemActive : ''}`} key={conversation.id}>
            <button className={styles.conversationSelect} type="button" onClick={() => onSelect(conversation)}>
              <span className={styles.conversationMain}>
                <strong className={styles.conversationTitle}>{getConversationTitle(conversation)}</strong>
                <span className={styles.conversationMeta}>{getRelativeTime(conversation.updated_at)}</span>
              </span>
            </button>
            <Dropdown label={`Actions for ${getConversationTitle(conversation)}`} trigger={<span aria-hidden="true">⋮</span>}>
              <button className={styles.disabledMenuItem} type="button" role="menuitem" disabled title="Conversation rename is not available yet">Rename</button>
              <button className={styles.disabledMenuItem} type="button" role="menuitem" disabled title="Conversation deletion is not available yet">Delete</button>
            </Dropdown>
          </div>
        ))}
      </div>
    </aside>
  )
}
