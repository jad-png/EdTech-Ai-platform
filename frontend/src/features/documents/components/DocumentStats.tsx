import { Card } from "../../../shared/components/ui/Card";
import { IconBadge } from "../../../shared/components/ui/IconBadge";
import styles from "./documents.module.css";
export function DocumentStats({
  total,
  ready,
  processing,
}: {
  total: number;
  ready: number;
  processing: number;
}) {
  return (
    <div className={styles.stats}>
      <Card className={styles.stat}>
        <IconBadge tone="violet" icon="▤" />
        <span className={styles.statLabel}>Total documents</span>
        <p className={styles.statValue}>{total}</p>
      </Card>
      <Card className={styles.stat}>
        <IconBadge tone="teal" icon="✓" />
        <span className={styles.statLabel}>Ready to study</span>
        <p className={styles.statValue}>{ready}</p>
      </Card>
      <Card className={styles.stat}>
        <IconBadge tone="orange" icon="◷" />
        <span className={styles.statLabel}>Processing</span>
        <p className={styles.statValue}>{processing}</p>
      </Card>
    </div>
  );
}
