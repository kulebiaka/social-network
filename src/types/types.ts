import { RootState } from "../redux/store"
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from "redux"

export type LoginFormType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
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

export interface ProfileUserType {
  aboutMe: string,
  contacts: ContactsType,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  userId: number,
  photos: PhotosType | undefined | null
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
  name: string | null,
  followed: boolean,
  status: string | null,
  photos: PhotosType,
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>