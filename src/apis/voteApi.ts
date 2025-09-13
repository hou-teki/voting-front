import type { VotePage, VoteRequest, VoteResponse } from '@/types/vote'
import http from '@/utils/http'

export async function createVote(req: VoteRequest): Promise<number> {
  const { data } = await http.post('/vote/new', req)
  return data
}

export async function getVoteList(page: number, size: number): Promise<VotePage> {
  const { data } = await http.get(`/vote/list`, { params: { page, size } })
  return data
}

export async function castVote(voteId: number, optionId: number): Promise<VoteResponse> {
  const { data } = await http.post(`/vote/cast/${voteId}/${optionId}`)
  return data
}
