import React from 'react';
import s from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props: any) => {
  return (
    <div className={s.dialog_item}>
      <NavLink to={`/dialogs/${props.id}`}>
        {props.userName}
      </NavLink>
    </div>
  )
}

export default DialogItem;