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

export const setUserIfLoggedIn = () => async (dispatch) => {
  let response = await authAPI.isUserLoggedIn()
  // .then(response => {
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(response))
  }
  // })
  return response
}

export const logIn = (values) => async (dispatch) => {
  let response = await authAPI.login(values)
  // .then(response => {
  // debugger
  if (response.resultCode === 0) {
    dispatch(setUserIfLoggedIn())
  }
  return response
  // })
}

export const logOut = () => async (dispatch) => {
  return authAPI.logOut()
    .then(response => {
      console.log(response)
      dispatch(resetUser())
    })
}

export const { setAuthUserData, resetUser } = authSlice.actions

export default authSlice.reducer