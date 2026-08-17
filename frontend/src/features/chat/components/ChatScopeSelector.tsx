import styles from "./chat.module.css";
export function ChatScopeSelector({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label className={styles.scope}>
      Scope
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
