export type DocumentStatus = "UPLOADED" | "PROCESSING" | "READY" | "FAILED";

export interface DocumentItem {
  id: string;
  title: string;
  status: DocumentStatus;
  size: string;
  createdAt: string;
  pageCount?: number;
  progress?: number;
  flashcardsMastered?: number;
}
