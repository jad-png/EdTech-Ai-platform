export type DocumentStatus = 'UPLOADED' | 'PROCESSING' | 'READY' | 'FAILED'
export interface DocumentRecord { id: string; title: string; file_size_bytes: number | null; status: DocumentStatus; error_message: string | null; created_at: string }
export interface DocumentUploadResponse { success: boolean; message: string; document: DocumentRecord; storage: Record<string, unknown> }
