export type Option = {
  id: number
  label: string
}

export type VoteForm = {
  title: string
  description: string
  creatorId: number
  startDate: string
  endDate: string
  options: Option[]
}
