import { createSlice } from "@reduxjs/toolkit"

const formSlice = createSlice({
  name: 'form',
  initialState: {
    email: '',
    password: '',
    rememberMe: false,
    errors: {}
  },
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: state => {
      state.name = '';
      state.email = '';
      state.rememberMe = false;
    },
  }
})

// const sendForm = (form) 

export const { updateField, resetForm } = formSlice.actions

export default formSlice.reducer
