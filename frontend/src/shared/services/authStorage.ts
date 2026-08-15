import type { AuthTokens } from '../types/auth'

const STORAGE_KEY = 'edtech.auth.tokens'

export const authStorage = {
  get(): AuthTokens | null {
    const value = localStorage.getItem(STORAGE_KEY)
    if (!value) return null
    try {
      return JSON.parse(value) as AuthTokens
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  },
  set(tokens: AuthTokens) { localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens)) },
  clear() { localStorage.removeItem(STORAGE_KEY) },
}
