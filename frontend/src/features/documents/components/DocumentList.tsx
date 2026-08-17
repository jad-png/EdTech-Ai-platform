import type { DocumentItem } from "./types";
import { DocumentCard } from "./DocumentCard";
import styles from "./documents.module.css";
export function DocumentList({
  documents,
  onOpen,
  onDelete,
  onGenerateFlashcards,
  onQuiz,
  onChat,
}: {
  documents: DocumentItem[];
  onOpen?: (document: DocumentItem) => void;
  onDelete?: (document: DocumentItem) => void;
  onGenerateFlashcards?: (document: DocumentItem) => void;
  onQuiz?: (document: DocumentItem) => void;
  onChat?: (document: DocumentItem) => void;
}) {
  return (
    <div className={styles.list}>
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onOpen={() => onOpen?.(document)}
          onDelete={() => onDelete?.(document)}
          onGenerateFlashcards={() => onGenerateFlashcards?.(document)}
          onQuiz={() => onQuiz?.(document)}
          onChat={() => onChat?.(document)}
        />
      ))}
    </div>
  );
}
