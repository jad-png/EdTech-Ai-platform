import type { ChatMessage } from "./types";
import styles from "./chat.module.css";
export function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className={`${styles.message} ${styles.messageUser}`}>
      <span className={styles.avatar} aria-hidden="true">
        You
      </span>
      <div className={styles.bubble}>
        <p className={styles.content}>{message.content}</p>
        {message.timestamp && (
          <span className={styles.time}>{message.timestamp}</span>
        )}
      </div>
    </div>
  );
}
