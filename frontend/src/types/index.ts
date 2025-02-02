export interface SignUpInft {
  fullName: string
  userName: string
  password: string
  confirmPassword: string
  gender: string
}

export type AuthUserType = {
  id: string
  fullName: string
  userName: string
  profilePic: string
  gender: string
}

export type SigninInputs = {
  fullName: string
  userName: string
  password: string
  confirmPassword: string
  gender: string
}

export type LoginInInputs = {
  userName: string
  password: string
}
