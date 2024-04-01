import React from 'react'
import styles from './DialogMessage.module.css'
import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'
import { useAppSelector } from '../../../redux';

const DialogMessage = ({ message }: any) => {

  const navigate = useNavigate()
  const authId = useAppSelector(state => state.authSlice.id)

  return (
    <div>
      <div className={styles.head}>
        <Avatar onClick={() => navigate(`/profile/${message.senderId}`)} size={32} src={message.photos} alt="user's photo" icon={<UserOutlined />} />
        <h5 className={styles.name}>{message.senderName}</h5> <br />
        <span className={styles.date}>{message.addedAt.toString().replace('T', ' ').slice(0, 19)}</span>
      </div>
      <p className={styles.message_body}>{message.body}</p>
    </div>
  )
}

export default DialogMessage