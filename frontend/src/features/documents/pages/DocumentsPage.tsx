import { useCallback, useEffect, useMemo, useState } from 'react'
import { LoadingState } from '../../../shared/components/LoadingState'
import { documentsApi } from '../api/documentsApi'
import { DocumentFilters } from '../components/DocumentFilters'
import { DocumentList } from '../components/DocumentList'
import { DocumentPageHeader } from '../components/DocumentPageHeader'
import { DocumentStats } from '../components/DocumentStats'
import { DocumentWorkspace } from '../components/DocumentWorkspace'
import { EmptyDocumentsState } from '../components/EmptyDocumentsState'
import type { DocumentItem } from '../components/types'
import type { DocumentRecord } from '../types'
import styles from '../components/documents.module.css'

function formatSize(bytes: number | null) { if (!bytes) return '—'; if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`; return `${(bytes / 1024 / 1024).toFixed(1)} MB` }
function toItem(document: DocumentRecord, index = 0): DocumentItem { const demoProgress = [70, 55, 35]; return { id: document.id, title: document.title, status: document.status, size: formatSize(document.file_size_bytes), createdAt: new Date(document.created_at).toLocaleDateString(), pageCount: undefined, progress: demoProgress[index % demoProgress.length], flashcardsMastered: 15 } }

export function DocumentsPage() {
  const [records, setRecords] = useState<DocumentRecord[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('ALL')
  const [selected, setSelected] = useState<DocumentItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => { try { const { data } = await documentsApi.list(); setRecords(data); setError('') } catch { setError('Unable to load your documents.') } finally { setLoading(false) } }, [])
  useEffect(() => { void load() }, [load])
  useEffect(() => { if (!records.some((document) => document.status === 'UPLOADED' || document.status === 'PROCESSING')) return; const timer = window.setInterval(() => { void load() }, 4000); return () => window.clearInterval(timer) }, [records, load])

  async function upload(file: File) { setUploading(true); setError(''); try { const { data } = await documentsApi.upload(file); setRecords((current) => [data.document, ...current]) } catch { setError('Upload failed. Make sure the file is a PDF within the allowed limits.') } finally { setUploading(false) } }
  async function remove(document: DocumentItem) { if (!window.confirm(`Delete ${document.title}?`)) return; try { await documentsApi.delete(document.id); setRecords((current) => current.filter((item) => item.id !== document.id)) } catch { setError('Unable to delete this document.') } }
  const filtered = useMemo(() => records.map(toItem).filter((document) => document.title.toLowerCase().includes(search.toLowerCase()) && (status === 'ALL' || document.status === status)), [records, search, status])
  const items = records.map(toItem)
  return <div className={styles.stack}><DocumentPageHeader onUpload={upload} uploading={uploading} />{error && <p role="alert">{error}</p>}{loading ? <LoadingState label="Loading documents…" /> : selected ? <DocumentWorkspace title={selected.title} status={selected.status} fileSize={items.find((item) => item.id === selected.id)?.size} pageCount={items.find((item) => item.id === selected.id)?.pageCount} /> : <>{items.length === 0 ? <EmptyDocumentsState onUpload={() => undefined} /> : <><DocumentStats total={items.length} ready={items.filter((document) => document.status === 'READY').length} processing={items.filter((document) => document.status === 'PROCESSING' || document.status === 'UPLOADED').length} /><DocumentFilters search={search} status={status} onSearch={setSearch} onStatusChange={setStatus} />{filtered.length ? <DocumentList documents={filtered} onOpen={setSelected} onDelete={remove} /> : <EmptyDocumentsState />}</>}</>}</div>
}
