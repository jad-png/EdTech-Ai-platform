import { ChatScopeSelector } from "./ChatScopeSelector";
import styles from "./chat.module.css";
export function ChatHeader({
  title = "Learning assistant",
  scope,
  scopes,
  onScopeChange,
}: {
  title?: string;
  scope: string;
  scopes: string[];
  onScopeChange?: (value: string) => void;
}) {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>
      <ChatScopeSelector
        value={scope}
        options={scopes}
        onChange={onScopeChange}
      />
    </div>
  );
}
