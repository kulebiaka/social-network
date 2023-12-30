import { RootState } from "../redux/store"
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from "redux"

export type LoginFormType = {
  email: string,
  login: string,
  password: string,
  captcha?: string
}

export type ContactsType = {
  facebook:string 
  website:string
  vk:string
  twitter:string
  instagram:string
  youtube:string
  github:string
  mainLink:string
}

export type ProfileUserType = {
  aboutMe: string,
  contacts: ContactsType,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  userId: number,
  photos: PhotosType
}

export type PostType = { 
  id: number,
  message: string,
  likesCount: number
}

export type PhotosType = {
  small: string | null,
  large: string | null,
}

export type UserType = {
  id: number,
  username: string | null,
  followed: boolean,
  status: string | null,
  photos: PhotosType,

}

export type AppThunkReturnType<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
export type AppThunk = AppThunkReturnType<void>