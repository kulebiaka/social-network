import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import formReducer from "./formReducer"

// let reducers = combineReducers({
//   profilePage: profileReducer,
//   dialogsPage: dialogsReducer,
//   usersPage: usersReducer,
//   sidebar: sidebarReducer,

// })

let store = configureStore({
  reducer:{
    authSlice: authReducer,
    form: formReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
  }
})

window.store = store;

export default store;