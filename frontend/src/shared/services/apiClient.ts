import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { authStorage } from './authStorage'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
export const apiClient = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } })

let refreshRequest: Promise<string | null> | null = null

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const tokens = authStorage.get()
  if (tokens) config.headers.Authorization = `Bearer ${tokens.access}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    if (error.response?.status !== 401 || !original || original._retry || original.url?.includes('/auth/token/')) {
      return Promise.reject(error)
    }
    const tokens = authStorage.get()
    if (!tokens) return Promise.reject(error)
    original._retry = true
    refreshRequest ??= apiClient.post<{ access: string; refresh?: string }>('/auth/token/refresh/', { refresh: tokens.refresh })
      .then(({ data }) => {
        if (!data.access) return null
        authStorage.set({ access: data.access, refresh: data.refresh ?? tokens.refresh })
        return data.access
      })
      .catch(() => { authStorage.clear(); return null })
      .finally(() => { refreshRequest = null })
    const access = await refreshRequest
    if (!access) return Promise.reject(error)
    original.headers.Authorization = `Bearer ${access}`
    return apiClient(original)
  },
)
