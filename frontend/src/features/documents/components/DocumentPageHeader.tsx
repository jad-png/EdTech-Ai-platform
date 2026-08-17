import { useRef } from 'react'
import { Button } from '../../../shared/components/ui/Button'
import styles from './documents.module.css'
export function DocumentPageHeader({ onUpload, uploading = false }: { onUpload?: (file: File) => void; uploading?: boolean }) { const inputRef = useRef<HTMLInputElement>(null); return <div className={styles.pageHeader}><div><h1>Documents</h1><p>Organize the material you are learning from.</p></div><input ref={inputRef} className="sr-only" type="file" accept="application/pdf,.pdf" onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload?.(file); event.target.value = '' }} /><Button onClick={() => inputRef.current?.click()} disabled={uploading}>{uploading ? 'Uploading…' : 'Upload document'}</Button></div> }
