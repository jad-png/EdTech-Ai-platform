import type { ChatMessage, Citation as CitationData } from "./types";
import { Citation } from "./Citation";
import styles from "./chat.module.css";
export function AssistantMessage({
  message,
  onCitationSelect,
}: {
  message: ChatMessage;
  onCitationSelect?: (citation: CitationData) => void;
}) {
  return (
    <div className={styles.message}>
      <span
        className={`${styles.avatar} ${styles.assistantAvatar}`}
        aria-hidden="true"
      >
        ✦
      </span>
      <div className={styles.bubble}>
        <p className={styles.content}>{message.content}</p>
        {message.citations?.length && (
          <div className={styles.citations}>
            {message.citations.map((citation) => (
              <Citation
                key={citation.id}
                citation={citation}
                onSelect={onCitationSelect}
              />
            ))}
          </div>
        )}
        {message.timestamp && (
          <span className={styles.time}>{message.timestamp}</span>
        )}
      </div>
    </div>
  );
}
