import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  const token = useUserStore().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      const store = useUserStore()
      store.clearUser()
    }

    const backendMsg = error.response?.data?.message
    const msg = backendMsg || error.message || 'Request failed'
    ElMessage.error(msg)
    return Promise.reject(error)
  },
)

export default http
