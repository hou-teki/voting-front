import type { CastVoteRequest, CastVoteResponse, VoteForm, VoteListItem } from '@/types/vote'
import http from '@/utils/http'

export const createVote = (data: VoteForm) => {
  return http.post('/vote/new', data)
}

export async function getVoteList(userId: number | null): Promise<VoteListItem[]> {
  const { data } = await http.get(`/vote/list`, { params: { userId } })
  return data
}

export async function castVote(req: CastVoteRequest): Promise<CastVoteResponse> {
  const { data } = await http.post('/vote/cast', req)
  return data
}
