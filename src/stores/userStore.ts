import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserDto, userState } from '@/types/user'

const STORAGE_KEY = 'user'

export const useUserStore = defineStore('user', {
  state: (): userState => ({
    id: null,
    username: null,
  }),
  getters: {
    isLogin(state) {
      return !!state.id
    },
  },
  actions: {
    setUser(user: UserDto) {
      this.id = user.id
      this.username = user.username
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    },
    loadUser() {
      const user = localStorage.getItem(STORAGE_KEY)
      if (!user) return
      try {
        const parsedUser = JSON.parse(user) as UserDto
        this.setUser(parsedUser)
      } catch {}
    },
    clearUser() {
      this.id = null
      this.username = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
