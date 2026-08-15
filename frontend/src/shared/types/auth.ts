export interface AuthTokens {
  access: string
  refresh: string
}

export interface User {
  id: number
  username: string
  email: string
  role: string
  max_documents: number
  max_storage_mb: number
  date_joined: string
}
