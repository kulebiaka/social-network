import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import appReducer from "./appReducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import chatReducer from "./chatReducer"

let store = configureStore({
  reducer:{
    appSlice: appReducer,
    authSlice: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    chat: chatReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store;