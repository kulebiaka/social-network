import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { chatAPI } from "../API/chatApi"
import store, { AppDispatch } from "."

export type MessageType = { 
  message: string,
  photo?: string,
  userId: number,
  userName: string
}

let initialState = {
  messages: [] as Array<MessageType>,
  newMessageText: '',
  status: 'pending' as 'pending' | 'ready' | 'error',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action){
      state.messages = [...state.messages, ...action.payload]
    },
    resetMessages(state){
      state.messages = []
    }
  }
})

const setMessagesCallback = (m : string) => store.dispatch(setMessages(m))

export const createConnectionWithChat = () => (dispatch: AppDispatch) =>  {
  chatAPI.subscribe(setMessagesCallback, 'messagesRecieved')
  chatAPI.start()
}
export const resetConnection = () => (dispatch: AppDispatch) =>  {
  chatAPI.unsubscribe(setMessagesCallback, 'messagesRecieved')
  chatAPI.stop()
  dispatch(resetMessages())
}

export const sendMessage = (message: string) => async () => {
  return chatAPI.sendMessage(message)
}

export const { setMessages, resetMessages } = chatSlice.actions

export default chatSlice.reducer