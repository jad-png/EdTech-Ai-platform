import type { Citation as CitationData } from "./types";
import styles from "./chat.module.css";
export function Citation({
  citation,
  onSelect,
}: {
  citation: CitationData;
  onSelect?: (citation: CitationData) => void;
}) {
  return (
    <button
      className={styles.citation}
      type="button"
      onClick={() => onSelect?.(citation)}
    >
      {citation.label}
      {citation.page ? ` · p. ${citation.page}` : ""}
    </button>
  );
}
