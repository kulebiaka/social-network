import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { MessageType, createConnectionWithChat, resetConnection, sendMessage } from '../../redux/chatReducer'
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import AddMessageForm from '../../components/AddMessageForm';



const Chat = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const messages = useAppSelector(state => state.chat.messages)
  const status = useAppSelector(state => state.chat.status)
  const isAuth = useAppSelector(state => state.authSlice.isAuth)

  useEffect(() => {
    if(!isAuth) {
      navigate('/login')
      return
    }
    dispatch(createConnectionWithChat())
    return () => dispatch(resetConnection())
  }, [])


  const onSendMessage = (message: string) => {
    return dispatch(sendMessage(message))
  }

  return (
    <div className='app-content-container'>
      <div style={{ height: '70vh', overflowY: 'auto', marginBottom: '5px', }}>
        {messages?.map((m, index) => <Message key={index} message={m} />)}
        {messages.length === 0 && <p style={{lineHeight:'75vh', textAlign:'center'}}>There is no messages yet.</p>}
      </div>
      <AddMessageForm sendMessage={onSendMessage}/>
    </div>
  )
}

export default Chat