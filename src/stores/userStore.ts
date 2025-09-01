import { defineStore } from 'pinia'
import type { UserDto, userState } from '@/types/user'

const USER_STORAGE_KEY = 'user'
const TOKEN_STORAGE_KEY = 'token'

export const useUserStore = defineStore('user', {
  state: (): userState => ({
    id: null,
    username: null,
    token: null,
  }),

  getters: {
    isLogin(state) {
      return !!state.token && !!state.id
    },
  },

  actions: {
    setUser(token: string, user: UserDto) {
      this.id = user.id
      this.username = user.username
      this.token = token

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
    },

    loadUser() {
      const user = localStorage.getItem(USER_STORAGE_KEY)
      const token = localStorage.getItem(TOKEN_STORAGE_KEY)

      if (!user || !token) return
      try {
        const parsedUser = JSON.parse(user) as UserDto
        this.setUser(token, parsedUser)
      } catch {
        this.clearUser()
      }
    },

    clearUser() {
      this.id = null
      this.username = null
      this.token = null

      localStorage.removeItem(USER_STORAGE_KEY)
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    },
  },
})
