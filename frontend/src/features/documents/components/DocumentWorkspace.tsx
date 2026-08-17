import { Card } from "../../../shared/components/ui/Card";
import { DocumentHeader } from "./DocumentHeader";
import { DocumentViewer } from "./DocumentViewer";
import styles from "./documents.module.css";
export function DocumentWorkspace({
  title,
  status = "READY",
  sourceUrl,
  fileSize,
  pageCount,
}: {
  title: string;
  status?: "UPLOADED" | "PROCESSING" | "READY" | "FAILED";
  sourceUrl?: string;
  fileSize?: string;
  pageCount?: number;
}) {
  return (
    <div className={styles.workspace}>
      <div className={styles.workspaceMain}>
        <DocumentHeader title={title} status={status} fileSize={fileSize} pageCount={pageCount} />
        <DocumentViewer title={title} sourceUrl={sourceUrl} />
      </div>
      <Card className={styles.reference}>
        <h3>Source references</h3><p>No highlighted passages yet.</p><div className={styles.highlight}>References from document-aware answers will appear here.</div>
      </Card>
    </div>
  );
}
