import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../API/api"

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: undefined
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUserData(state, action) {
      return {
        ...action.payload.data,
        isAuth: true
      }
    },
    resetUser(state) {
      return {
        ...initialState,
        isAuth: false
      }
    }
  }
})

export const setUserIfLoggedIn = () => (dispatch) => {
  authAPI.isUserLoggedIn()
    .then(response => {
      if (response.resultCode === 0) {
        dispatch(setAuthUserData(response))
      }
    })
}

export const logIn = (values) => (dispatch) => {
  authAPI.login(values)
    .then(response => {
      if (response.resultCode === 0) {
        dispatch(setUserIfLoggedIn())
      }
      return response
    })
}

export const logOut = () => (dispatch) => {
  authAPI.logOut()
    .then(response => {
      console.log(response)
      dispatch(resetUser())
    })
}

export const { setAuthUserData, resetUser } = authSlice.actions

export default authSlice.reducer