import type { LoginRequest, LoginResponse } from '@/types/user'
import http from '@/utils/http'

export async function register(req: LoginRequest): Promise<LoginResponse> {
  const { data } = await http.post('/auth/register', req)
  return data as LoginResponse
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const { data } = await http.post('/auth/login', req)
  return data as LoginResponse
}

export async function logout() {
  return null
}
