export type Option = {
  id: number
  label: string
}

export type OptionWithCount = {
  id: number
  label: string
  count: number
}

export type VoteForm = {
  title: string
  description: string
  creatorId: number
  startDate: string
  endDate: string
  options: Option[]
}

export type VoteListItem = {
  id: number
  title: string
  description: string
  creatorId: number
  startDate: string
  endDate: string
  options: OptionWithCount[]
  total: number
}

export type VoteItemDto = {
  id: number
  title: string
  description: string
  creatorId: number
  startDate: string
  endDate: string
  options: Option[]
}

export type CastVoteRequest = {
  userId: number
  voteId: number
  optionId: number
}

export type CastVoteResponse = {
  voteId: number
  total: number
  options: OptionWithCount[]
}
