import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { updateNewMessageText, sendMessage } from '../../redux/dialogsReducer';
import { useSelector, useDispatch } from 'react-redux';

const Dialogs = (props) => {

  let state = useSelector(state => state.dialogsPage)
  let dispatch = useDispatch()

  let dialogsComponents = state.dialogs.map((d) => (<DialogItem userName={d.userName} id={d.id} />))
  let messagesComponents = state.messages.map(m => (<Message message={m.message} avatar={m.avatar} />))

  // let newMessage = React.createRef();

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