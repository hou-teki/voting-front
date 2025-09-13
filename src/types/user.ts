export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  user: UserDto
}

export type UserDto = {
  id: number
  username: string
  ageRange: string
  gender: string
  department: string
}

export type userState = {
  id: number | null
  username: string | null
  token: string | null
}
