import styles from "./quizzes.module.css";
export function SourceReference({ label }: { label: string }) {
  return <span className={styles.source}>Source: {label}</span>;
}
