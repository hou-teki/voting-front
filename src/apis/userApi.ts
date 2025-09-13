import type { UserDto } from '@/types/user'
import type { VotePage } from '@/types/vote'
import http from '@/utils/http'

export async function updateMyProfile(req: UserDto): Promise<UserDto> {
  const { data } = await http.post('/user/me', req)
  return data
}

export async function getMyProfile(): Promise<UserDto> {
  const { data } = await http.get(`/user/me`)
  return data
}

export async function getMyCreatedVotes(page: number, size: number): Promise<VotePage> {
  const { data } = await http.get('/user/created', { params: { page, size } })
  return data
}

export async function getMyParticipatedVotes(page: number, size: number): Promise<VotePage> {
  const { data } = await http.get('/user/participated', { params: { page, size } })
  return data
}
