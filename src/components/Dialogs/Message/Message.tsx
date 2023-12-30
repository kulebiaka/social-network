import React from 'react';
import s from './Message.module.css';

const Message = (props: any) => {
  return(
    <div className={s.message}>
      <img src={props.avatar} alt="" />

      <span>{props.message}</span>
    </div>
  )
}

export default Message;