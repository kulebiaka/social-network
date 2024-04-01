import React, { useEffect } from 'react'
import { getDialogById, sendMessage, setDialog } from '../../../redux/dialogsReducer'
import AddMessageForm  from '../../../components/AddMessageForm'
import { useAppDispatch, useAppSelector } from '../../../redux'
import DialogMessage from '../DialogMessage/DialogMessage'

type PropsType = {
  userId: number | string
}

const Dialog = ({ userId }: PropsType) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(setDialog(userId))
      dispatch(getDialogById(userId))
    }
  }, [])

  const messages = useAppSelector(state => state.dialogsPage.messages)

  const onSendMessage = (message: string) => {
    return dispatch(sendMessage(userId, message))
  }

  return (
    <div>
      <div style={{ height: '75vh', overflowY: 'auto', marginBottom: '5px', }}>
        {messages?.map((m) => <DialogMessage key={m.id} message={m} />)}
        {messages.length === 0 && <p style={{lineHeight:'75vh', textAlign:'center'}}>There is no messages yet.</p>}
      </div>
      <div style={{ padding: '20px 0 0', borderTop: '1px solid #ccc' }}>

        <AddMessageForm sendMessage={onSendMessage} />
      </div>
    </div>
  )
}

export default Dialog