import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "."
import { dialogsApi } from "../API/dialogsApi"


const initialState = {
  dialogs: [] as Array<any>,
  currentDialog: null as null | any,
  messages: [] as Array<any>,
  newMessageText: ''
}

const dialogsSlice = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {

    setDialogs(state, action: PayloadAction<Array<any>>){
      state.dialogs = action.payload
    },

    setDialog(state, action: PayloadAction<any>){
      state.currentDialog = state.dialogs.find(d => d.id == action.payload)
    },

    setDialogMessages(state, action: PayloadAction<any>){
      state.messages = action.payload
    },

    sendMessage(state, action: PayloadAction<string>) {
      debugger
      const newMessage = {
        message: action.payload,
      }
      state.newMessageText = '';
      state.messages.push(newMessage)
      debugger
    },
  }
})

export const getDialogs = () => async (dispatch: AppDispatch) => {
  const response = await dialogsApi.getDialogs()
  dispatch(setDialogs(response))
}

export const getDialogById = (id: number | string) => async (dispatch: AppDispatch) => {
  const messages = await dialogsApi.getDialogById(id)
  dispatch(setDialogMessages(messages.items))
}

export const sendMessage = (id: any, message: string) => async (dispatch: AppDispatch) => {
  const response = await dialogsApi.sendMessage(id, message) 
  setDialog(response)
  return response
}

export const { setDialogs, setDialog, setDialogMessages } = dialogsSlice.actions

export default dialogsSlice.reducer