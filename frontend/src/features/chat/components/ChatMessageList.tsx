import type { ChatMessage, Citation as CitationData } from "./types";
import { AssistantMessage } from "./AssistantMessage";
import { UserMessage } from "./UserMessage";
import styles from "./chat.module.css";
export function ChatMessageList({
  messages,
  isTyping = false,
  onCitationSelect,
}: {
  messages: ChatMessage[];
  isTyping?: boolean;
  onCitationSelect?: (citation: CitationData) => void;
}) {
  return (
    <div className={styles.messages} aria-live="polite">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AssistantMessage
            key={message.id}
            message={message}
            onCitationSelect={onCitationSelect}
          />
        ),
      )}
      {isTyping && (
        <span className={styles.typing}>Assistant is thinking…</span>
      )}
    </div>
  );
}
