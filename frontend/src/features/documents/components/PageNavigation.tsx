import styles from "./documents.module.css";
export function PageNavigation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className={styles.toolGroup}>
      <button
        className={styles.toolButton}
        type="button"
        onClick={onPrevious}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span className={styles.pageCount}>
        {currentPage} / {totalPages}
      </span>
      <button
        className={styles.toolButton}
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
