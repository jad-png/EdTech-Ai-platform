import styles from "./documents.module.css";
export function DocumentViewerToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onPrevious,
  onNext,
  currentPage,
  totalPages,
}: {
  zoom: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolGroup}>
        <button
          className={styles.toolButton}
          type="button"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          ←
        </button>
        <span className={styles.pageCount}>
          Page {currentPage} of {totalPages || "—"}
        </span>
        <button
          className={styles.toolButton}
          type="button"
          onClick={onNext}
          disabled={totalPages > 0 && currentPage >= totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </div>
      <div className={styles.toolGroup}>
        <button
          className={styles.toolButton}
          type="button"
          onClick={onZoomOut}
          aria-label="Zoom out"
        >
          −
        </button>
        <span className={styles.pageCount}>{Math.round(zoom * 100)}%</span>
        <button
          className={styles.toolButton}
          type="button"
          onClick={onZoomIn}
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
