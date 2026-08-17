export interface Citation {
  id: string;
  label: string;
  page?: number;
}
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  citations?: Citation[];
}
export interface Message { id: string; role: 'USER' | 'ASSISTANT'; content: string; created_at: string }
export interface Conversation { id: string; document: string | null; created_at: string; updated_at: string; messages: Message[] }
export interface BackendSource { id?: string; document_id?: string; content?: string; page_number?: number; chunk_index?: number; score?: number }
export interface ChatResponse { answer: string; sources: BackendSource[] }
