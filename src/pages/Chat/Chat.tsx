import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { MessageType, createConnectionWithChat, resetConnection, sendMessage } from '../../redux/chatReducer'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';



const Chat = () => {

  const dispatch = useAppDispatch()
  const messages = useAppSelector(state => state.chat.messages)
  const status = useAppSelector(state => state.chat.status)

  useEffect(() => {
    dispatch(createConnectionWithChat())
    return () => dispatch(resetConnection())
  }, [])

  const onSendMessageClick = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    dispatch(sendMessage(values.messageText))
    setSubmitting(false)
    values.messageText = ''
  }

  return (
    <div>
      <div style={{ height: '70vh', overflowY: 'auto', marginBottom: '5px', }}>
        {messages?.map((m, index) => <Message key={index} message={m} />)}
      </div>
      <div style={{ padding: '20px 0 0', borderTop: '1px solid #ccc' }}>
        <Formik
          initialValues={{
            messageText: '',
          }}
          onSubmit={onSendMessageClick}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Field as="textarea" placeholder="Enter your message" name="messageText" />
              <button type="submit" disabled={status !== 'pending' || values.messageText.length === 0} >Send message</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Chat