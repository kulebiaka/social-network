import { createSlice, PayloadAction } from "@reduxjs/toolkit"


let initialState = {
  dialogs: [
    { userName: 'Muhemed', id: 1 },
    { userName: 'Valera', id: 2 },
    { userName: 'Vasya', id: 3 },
    { userName: 'Lana', id: 4 },
    { userName: 'Marmont', id: 5 },
  ],

  messages: [
    { userId: 2, message: 'Hi', userName: 'Oleg' },
    { userId: 2, message: 'Hi', userName: 'Oleg' },
    { userId: 2, message: 'Hi', userName: 'Oleg' },
    { userId: 2, message: 'Hi', userName: 'Oleg' },
  ],

  newMessageText: ''
}

const dialogsSlice = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<string>) {
      const newMessage = {
        message: action.payload,
      }
      state.newMessageText = '';
      // state.messages.push(newMessage)
    },
  }
})

export const { sendMessage } = dialogsSlice.actions

export default dialogsSlice.reducer