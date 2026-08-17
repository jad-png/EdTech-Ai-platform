import styles from "./documents.module.css";
export function DocumentFilters({
  search,
  status,
  onSearch,
  onStatusChange,
}: {
  search: string;
  status: string;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
}) {
  return (
    <div className={styles.filters}>
      <label className="sr-only" htmlFor="document-search">
        Search documents
      </label>
      <div className={styles.searchWrap}><span className={styles.searchIcon} aria-hidden="true">⌕</span><input
        id="document-search"
        className={styles.search}
        placeholder="Search your documents"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      /></div>
      <label className="sr-only" htmlFor="document-status">
        Filter by status
      </label>
      <select
        id="document-status"
        className={styles.select}
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="ALL">All statuses</option>
        <option value="READY">Ready</option>
        <option value="PROCESSING">Processing</option>
        <option value="FAILED">Failed</option>
      </select>
    </div>
  );
}
