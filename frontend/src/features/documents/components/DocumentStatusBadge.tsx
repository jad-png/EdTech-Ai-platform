import type { DocumentStatus } from "./types";
import styles from "./documents.module.css";

const labels: Record<DocumentStatus, string> = {
  UPLOADED: "Uploaded",
  PROCESSING: "Processing",
  READY: "Ready",
  FAILED: "Failed",
};
export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
      {labels[status]}
    </span>
  );
}
