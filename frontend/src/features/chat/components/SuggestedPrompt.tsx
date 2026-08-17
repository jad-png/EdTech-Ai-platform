import styles from "./chat.module.css";
export function SuggestedPrompt({
  prompt,
  onSelect,
}: {
  prompt: string;
  onSelect?: (prompt: string) => void;
}) {
  return (
    <button
      className={styles.suggested}
      type="button"
      onClick={() => onSelect?.(prompt)}
    >
      {prompt}
    </button>
  );
}
