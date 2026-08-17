import styles from "./dashboard.module.css";
export function RecommendationCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.recommendation}>
      <span className={styles.recommendationIcon} aria-hidden="true">
        ✦
      </span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
