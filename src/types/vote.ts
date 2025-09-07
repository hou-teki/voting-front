export type VoteRequest = {
  title: string
  description: string
  startDate: string
  endDate: string
  options: string[]
}

export type VoteResponse = {
  id: number
  title: string
  description: string
  creatorId: number
  startDate: string
  endDate: string
  options: VoteOptionResponse[]
  totalVotes: number
  canViewResult: boolean
  canCast: boolean
}

export type VoteOptionResponse = {
  id: number
  label: string
  count: number
}

export type VotePage = {
  content: VoteResponse[]
  pageable: {
    pageNumber: number
    pageSize: number
  }
  last: boolean
}
