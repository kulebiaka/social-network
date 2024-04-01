import React from 'react';
import s from './DialogPreview.module.css';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import UserOutlined from '@ant-design/icons'

const DialogPreview = ({ dialog }: any) => {
  const { id, userName, photos, hasNewMessages, newMessagesCount } = dialog

  return (
    <NavLink className={s.dialog_preview} to={`/dialogs/${id}`}>
      <Avatar size={64} src={photos.small} alt="user's photo" icon={<UserOutlined />} />
      <h5 className={s.username}>{userName}</h5>
    </NavLink>
  )
}

export default DialogPreview;