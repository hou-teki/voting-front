import type { CastVoteRequest, CastVoteResponse, VoteForm, VotePage } from '@/types/vote'
import http from '@/utils/http'

export const createVote = (data: VoteForm) => {
  return http.post('/vote/new', data)
}

export async function getVoteList(
  page: number,
  size: number,
  userId: number | null,
): Promise<VotePage> {
  const { data } = await http.get(`/vote/list`, { params: { page, size, userId } })
  return data
}

export async function castVote(req: CastVoteRequest): Promise<CastVoteResponse> {
  const { data } = await http.post('/vote/cast', req)
  return data
}
