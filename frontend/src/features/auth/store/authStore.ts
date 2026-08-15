import { create } from 'zustand'
import { authApi } from '../api/authApi'
import { authStorage } from '../../../shared/services/authStorage'
import type { User } from '../../../shared/types/auth'

type RegisterPayload = { username: string; email: string; password: string; password2: string }

interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  initialize: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  async initialize() {
    if (get().isInitialized) return
    if (!authStorage.get()) {
      set({ isLoading: false, isInitialized: true })
      return
    }
    try {
      const { data } = await authApi.me()
      set({ user: data, isLoading: false, isInitialized: true })
    } catch {
      authStorage.clear()
      set({ user: null, isLoading: false, isInitialized: true })
    }
  },

  async login(username, password) {
    const { data: tokens } = await authApi.login(username, password)
    authStorage.set(tokens)
    const { data: user } = await authApi.me()
    set({ user })
  },

  async register(payload) {
    await authApi.register(payload)
    await get().login(payload.username, payload.password)
  },

  logout() {
    authStorage.clear()
    set({ user: null })
  },
}))
