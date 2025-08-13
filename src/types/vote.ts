export type Option = {
  label: string
}

export type OptionWithCount = {
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
  title: string
  description: string
  creatorId: number
  startDate: string
  endDate: string
  options: OptionWithCount[]
}
