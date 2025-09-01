import type { LoginRequest, LoginResponse } from '@/types/user'
import type { VoteItemDto } from '@/types/vote'
import http from '@/utils/http'

export async function register(req: LoginRequest): Promise<LoginResponse> {
  const { data } = await http.post('/user/register', req)
  return data as LoginResponse
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const { data } = await http.post('/user/login', req)
  return data as LoginResponse
}

export async function logout() {
  return null
}

export async function getMyCreatedVotes(userId: number): Promise<VoteItemDto[]> {
  const { data } = await http.get('/my/created', { params: { userId } })
  return data
}
