import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../API/authApi"
import { AppThunk, LoginFormType } from "../types/types"

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: null as boolean | null,
  captchaUrl: ''
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
    },
    getCaptchaUrlSuccess(state, action) {
      return {
        ...state,
        captchaUrl: action.payload
      }
    }
  }
})

export const setUserIfLoggedIn = (): AppThunk<any> => async (dispatch) => {
  let response = await authAPI.isUserLoggedIn()
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(response))
  }
  return response
}

export const logIn = (values: LoginFormType): AppThunk<any> => async (dispatch) => {
  let response = await authAPI.login(values)
  if (response.resultCode === 0) {
    dispatch(setUserIfLoggedIn())
  }
  return response
}

export const getCaptcha = (): AppThunk => async (dispatch) => {
  let response = await authAPI.getCaptchaUrl()
  dispatch(getCaptchaUrlSuccess(response.url))
}

export const logOut = (): AppThunk => async (dispatch) => {
  let response = await authAPI.logOut()
  console.log(response)
  dispatch(resetUser())
}

export const { setAuthUserData, resetUser, getCaptchaUrlSuccess } = authSlice.actions

export default authSlice.reducer