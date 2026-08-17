import { Card } from "../../../shared/components/ui/Card";
import styles from "./dashboard.module.css";
export function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <Card className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <p className={styles.statValue}>{value}</p>
      {trend && <span className={styles.statTrend}>{trend}</span>}
    </Card>
  );
}
