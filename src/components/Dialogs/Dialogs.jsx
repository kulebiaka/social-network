import React, { useEffect } from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { sendMessage } from '../../redux/dialogsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';

const Dialogs = (props) => {

  let state = useSelector(state => ({ ...state.dialogsPage, isAuth: state.authSlice.isAuth }))
  let navigate = useNavigate()

  // useEffect(() => {
  //   if (!state.isAuth) {
  //     navigate('/login')
  //   }
  // }, [])

  let dialogsComponents = state.dialogs.map((d) => (<DialogItem userName={d.userName} id={d.id} />))
  let messagesComponents = state.messages.map(m => (<Message message={m.message} avatar={m.avatar} />))

  return (
    <div className={s.dialogs}>

      <div className={s.dialogs_list}>
        {dialogsComponents}
      </div>

      <div className={s.message_list}>
        {messagesComponents}
        <AddMessageForm />
      </div>
    </div>
  )
}

const AddMessageForm = (props) => {

  const dispatch = useDispatch()

  const onSendMessageClick = (values, { setSubmitting }) => {
    dispatch(sendMessage(values.messageText))
    setSubmitting(false)
    // setFieldValue('messageText', '')
    values.messageText = ''
  }


  return (
    <Formik
      initialValues={{
        messageText: '',
      }}
      onSubmit={onSendMessageClick}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field as="textarea" placeholder="Enter your message" name="messageText"/>
          <button type="submit" disabled={isSubmitting} >Send message</button>
        </Form>
      )}
    </Formik>
  )
}

export default Dialogs;