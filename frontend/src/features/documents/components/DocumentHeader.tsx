import { DocumentStatusBadge } from "./DocumentStatusBadge";
import type { DocumentStatus } from "./types";
import styles from "./documents.module.css";
export function DocumentHeader({
  title,
  status,
  fileSize,
  pageCount,
}: {
  title: string;
  status: DocumentStatus;
  fileSize?: string;
  pageCount?: number;
}) {
  return (
    <div className={styles.documentHeader}>
      <div><h2>{title}</h2><p className={styles.documentMeta}>PDF{fileSize && ` · ${fileSize}`}{pageCount && ` · ${pageCount} pages`}</p></div><DocumentStatusBadge status={status} />
    </div>
  );
}
