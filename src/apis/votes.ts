import type { VoteForm } from '@/types/vote'
import http from '@/utils/http'

export const createVote = (data: VoteForm) => {
  return http.post('/vote/new', data)
}

export const getVote = () => {
  return http.get(`/vote/list`)
}
