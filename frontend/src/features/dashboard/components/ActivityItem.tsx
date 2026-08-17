import styles from "./dashboard.module.css";
export function ActivityItem({
  title,
  meta,
  score,
}: {
  title: string;
  meta: string;
  score?: string;
}) {
  return (
    <div className={styles.activityItem}>
      <div>
        <p className={styles.activityTitle}>{title}</p>
        <p className={styles.activityMeta}>{meta}</p>
      </div>
      {score && <span className={styles.activityScore}>{score}</span>}
    </div>
  );
}
