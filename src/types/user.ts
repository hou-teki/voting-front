export type LoginRequest = {
  username: string
  password: string
}

export type UserDto = {
  id: number
  username: string
}

export type userState = {
  id: number | null
  username: string | null
}
