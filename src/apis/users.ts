import type { LoginRequest, UserDto } from '@/types/user'
import http from '@/utils/http'

export async function register(req: LoginRequest): Promise<UserDto> {
  const { data } = await http.post('/user/register', req)
  return data
}

export async function login(req: LoginRequest): Promise<UserDto> {
  const { data } = await http.post(`/user/login`, req)
  return data
}

export async function logout() {
  return null
}
