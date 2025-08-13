import type { VoteForm, VoteListItem } from '@/types/vote'
import http from '@/utils/http'

export const createVote = (data: VoteForm) => {
  return http.post('/vote/new', data)
}

export async function getVoteList(): Promise<VoteListItem[]> {
  const { data } = await http.get(`/vote/list`)
  return data
}
