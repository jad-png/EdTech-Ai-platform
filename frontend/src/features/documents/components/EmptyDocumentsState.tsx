import { Button } from "../../../shared/components/ui/Button";
import styles from "./documents.module.css";
export function EmptyDocumentsState({ onUpload }: { onUpload?: () => void }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon} aria-hidden="true">
        ▧
      </div>
      <h2>Your library is ready for its first document</h2>
      <p>Upload a PDF to start asking questions and generating quizzes.</p>
      <Button onClick={onUpload}>Upload your first document</Button>
    </div>
  );
}
