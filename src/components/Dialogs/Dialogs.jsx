import React, { useEffect } from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { updateNewMessageText, sendMessage } from '../../redux/dialogsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dialogs = (props) => {

  let state = useSelector(state => ({...state.dialogsPage, isAuth: state.authSlice.isAuth}))
  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    if (!state.isAuth) {
      navigate('/login')
    }
  }, [])

  let dialogsComponents = state.dialogs.map((d) => (<DialogItem userName={d.userName} id={d.id} />))
  let messagesComponents = state.messages.map(m => (<Message message={m.message} avatar={m.avatar} />))


  let onNewMessageChange = (e) => {
    dispatch(updateNewMessageText(e.target.value))
  }

  let onSendMessageClick = () => {
    dispatch(sendMessage())
  }

  return (
    <div className={s.dialogs}>

      <div className={s.dialogs_list}>
        {dialogsComponents}
      </div>

      <div className={s.message_list}>
        {messagesComponents}
        <div>
          <textarea
            // ref={newMessage}
            placeholder='Enter your message' 
            value={state.newMessageText}
            onChange={onNewMessageChange} 
          />
          <button onClick={onSendMessageClick}>Send message</button>
        </div>
      </div>
    </div>
  )
}

export default Dialogs;