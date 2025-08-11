import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  // const token = useUserStore().token
  // if (token) {
  //     config.headers.Authorization = `Bearer ${token}`
  // }
  return config
})

http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error.response.data.message || '请求失败')
    return Promise.reject(error)
  },
)

export default http
