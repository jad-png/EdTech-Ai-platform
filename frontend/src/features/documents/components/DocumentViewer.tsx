import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Card } from '../../../shared/components/ui/Card'
import { DocumentViewerToolbar } from './DocumentViewerToolbar'
import styles from './documents.module.css'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

export function DocumentViewer({ title, sourceUrl, currentPage = 1, totalPages = 0, zoom = 1 }: { title: string; sourceUrl?: string; currentPage?: number; totalPages?: number; zoom?: number }) {
  const [page, setPage] = useState(currentPage)
  const [pages, setPages] = useState(totalPages)
  const [scale, setScale] = useState(zoom)
  return <Card className={styles.viewerPanel} radius="large"><DocumentViewerToolbar zoom={scale} currentPage={page} totalPages={pages} onZoomIn={() => setScale((value) => Math.min(2, value + .1))} onZoomOut={() => setScale((value) => Math.max(.6, value - .1))} onPrevious={() => setPage((value) => Math.max(1, value - 1))} onNext={() => setPage((value) => Math.min(pages || value + 1, value + 1))} /><div className={styles.viewer}>{sourceUrl ? <Document file={sourceUrl} onLoadSuccess={({ numPages }) => { setPages(numPages); setPage((value) => Math.min(value, numPages)) }} loading={<span role="status">Loading PDF…</span>} error={<span role="alert">Unable to render this PDF.</span>}><Page pageNumber={page} scale={scale} renderTextLayer renderAnnotationLayer /></Document> : <div className={styles.viewerUnavailable}><strong>PDF preview unavailable</strong><span>The document API does not currently expose a browser-downloadable PDF source.</span></div>}</div><span className={styles.viewerTitle}>{title}</span></Card>
}
