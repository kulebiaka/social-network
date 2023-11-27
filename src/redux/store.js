import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import appReducer from "./appReducer"

// let reducers = combineReducers({
//   profilePage: profileReducer,
//   dialogsPage: dialogsReducer,
//   usersPage: usersReducer,
//   sidebar: sidebarReducer,

// })

let store = configureStore({
  reducer:{
    appSlice: appReducer,
    authSlice: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
  }
})

window.store = store;

export default store;