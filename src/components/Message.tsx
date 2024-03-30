import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageType } from '../redux/chatReducer'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'


const Message = ({ message }: { message: MessageType }) => {

  const navigate = useNavigate()

  return <div style={{ display: 'flex', padding: '10px' }}>
    <Avatar onClick={() => navigate(`/profile/${message.userId}`)} size={32} src={message?.photo} alt="user's photo" icon={<UserOutlined />} />
    <div style={{ margin: '0 0 0 10px' }}>
      <h5 style={{ lineHeight: '32px', marginBottom: ''}}>{message.userName}</h5>
      <p>{message.message}</p>
    </div>
  </div>
}

export default Message