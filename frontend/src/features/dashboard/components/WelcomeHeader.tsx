import styles from "./dashboard.module.css";
export function WelcomeHeader({
  name,
  period,
  onPeriodChange,
}: {
  name: string;
  period: string;
  onPeriodChange?: (period: string) => void;
}) {
  return (
    <div className={styles.welcome}>
      <div>
        <h2>Good morning, {name}</h2>
        <p>Keep your learning streak going.</p>
      </div>
      <select
        className={styles.filter}
        value={period}
        onChange={(event) => onPeriodChange?.(event.target.value)}
        aria-label="Filter dashboard period"
      >
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
        <option>All time</option>
      </select>
    </div>
  );
}
