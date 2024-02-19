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
    { id: 1, message: 'Hi', avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
    { id: 2, message: 'What`s up?', avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
    { id: 3, message: 'Yo', avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
    { id: 4, message: 'Ok', avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
  ],

  newMessageText: ''
}

const dialogsSlice = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<string>) {
      const newMessage = {
        id: (state.messages.length + 1),
        message: action.payload,
        avatar: "https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg"
      }
      state.newMessageText = '';
      state.messages.push(newMessage)
    },
  }
})

export const { sendMessage } = dialogsSlice.actions

export default dialogsSlice.reducer