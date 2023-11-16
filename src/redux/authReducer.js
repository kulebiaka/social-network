import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../API/api"

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUserData(state, action) {
      return {
        ...action.payload,
        isAuth: true
      }
    }
  }
})

export const setUserIfLoggedIn = () => (dispatch) => {
  authAPI.isUserLoggedIn()
    .then(response => {
      if (response.resultCode === 0) {
        dispatch(setAuthUserData(response.data))
      }
    })
}

export const { setAuthUserData } = authSlice.actions

export default authSlice.reducer