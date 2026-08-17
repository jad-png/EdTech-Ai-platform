import styles from "./chat.module.css";
export function FollowUpActions({
  actions,
  onSelect,
}: {
  actions: string[];
  onSelect?: (action: string) => void;
}) {
  return (
    <div className={styles.followups}>
      {actions.map((action) => (
        <SuggestedAction key={action} action={action} onSelect={onSelect} />
      ))}
    </div>
  );
}
function SuggestedAction({
  action,
  onSelect,
}: {
  action: string;
  onSelect?: (action: string) => void;
}) {
  return (
    <button
      className={styles.suggested}
      type="button"
      onClick={() => onSelect?.(action)}
    >
      {action}
    </button>
  );
}
