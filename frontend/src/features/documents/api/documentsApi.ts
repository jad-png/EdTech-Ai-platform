import { apiClient } from '../../../shared/services/apiClient'
import type { DocumentRecord, DocumentUploadResponse } from '../types'

export const documentsApi = {
  list() { return apiClient.get<DocumentRecord[]>('/documents/') },
  upload(file: File) { const body = new FormData(); body.append('file', file); return apiClient.post<DocumentUploadResponse>('/documents/', body, { headers: { 'Content-Type': 'multipart/form-data' } }) },
  detail(id: string) { return apiClient.get<DocumentRecord>(`/documents/${id}/`) },
  delete(id: string) { return apiClient.delete(`/documents/${id}/`) },
}
