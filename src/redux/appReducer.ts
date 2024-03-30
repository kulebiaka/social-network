import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setUserIfLoggedIn } from "./authReducer"
import { AppThunk } from "../lib/types"

let initialState = {
  initialized: false
} 

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload
    }
  }
})

export const initializeApp = () : AppThunk => async (dispatch) => {
  dispatch(setUserIfLoggedIn())
    .then(() => {dispatch(setInitialized(true))})
} 

export const { setInitialized } = appSlice.actions

export default appSlice.reducer