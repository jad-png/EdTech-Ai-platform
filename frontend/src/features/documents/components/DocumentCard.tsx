import { Card } from "../../../shared/components/ui/Card";
import { DocumentActions } from "./DocumentActions";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import type { DocumentItem } from "./types";
import styles from "./documents.module.css";
export function DocumentCard({
  document,
  selected = false,
  onOpen,
  onRename,
  onDelete,
  onGenerateFlashcards,
  onQuiz,
  onChat,
}: {
  document: DocumentItem;
  selected?: boolean;
  onOpen?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onGenerateFlashcards?: () => void;
  onQuiz?: () => void;
  onChat?: () => void;
}) {
  return (
    <Card className={`${styles.card} ${selected ? styles.selected : ""}`}>
      <span className={styles.icon} aria-hidden="true">
        PDF
      </span>
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{document.title}</h3>
        <p className={styles.meta}>
          <DocumentStatusBadge status={document.status} />
          <span>{document.size}</span>
          {document.pageCount && <span>{document.pageCount} pages</span>}
          <span>{document.createdAt}</span>
        </p>
        {(document.progress !== undefined || document.flashcardsMastered !== undefined) && <div className={styles.learningProgress}><div className={styles.progressLabel}><span>{document.progress !== undefined ? `${document.progress}% Studied` : ''}</span>{document.flashcardsMastered !== undefined && <span>{document.flashcardsMastered} Flashcards Mastered</span>}</div>{document.progress !== undefined && <div className={styles.progressTrack}><span style={{ width: `${document.progress}%` }} /></div>}</div>}
      </div>
      <DocumentActions
        onOpen={onOpen}
        onRename={onRename}
        onDelete={onDelete}
        onGenerateFlashcards={onGenerateFlashcards}
        onQuiz={onQuiz}
        onChat={onChat}
      />
    </Card>
  );
}
