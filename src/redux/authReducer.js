import { createSlice } from "@reduxjs/toolkit"

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers:{
    setAuthUserData(state, action){
      return {
        ...action.payload,
        isAuth: true
      }
    }
  }
})

export const { setAuthUserData } = authSlice.actions

export default authSlice.reducer