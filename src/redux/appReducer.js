import { AnyAction, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../API/api"
import { setUserIfLoggedIn } from "./authReducer"

let initialState = {
  initialized: false
} 

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setInitialized(state, action) {
      state.initialized = action.payload
    }
  }
})

export const initializeApp = () => (dispatch) => {
  dispatch(setUserIfLoggedIn())
    .then(() => {dispatch(setInitialized(true))})
} 

export const { setInitialized } = appSlice.actions

export default appSlice.reducer