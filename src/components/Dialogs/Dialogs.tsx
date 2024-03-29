import React, { useEffect } from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { sendMessage } from '../../redux/dialogsReducer';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const Dialogs = () => {

  let state = useAppSelector(state => ({ ...state.dialogsPage, isAuth: state.authSlice.isAuth }))

  const dialogsComponents = state.dialogs.map((d) => (<DialogItem userName={d.userName} id={d.id} key={d.id} />))
  const messagesComponents = state.messages.map(m => (<Message message={m.message} avatar={m.avatar} />))

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

type ValuesType = {
  messageText: string
}

const AddMessageForm = () => {

  const dispatch = useAppDispatch()

  const onSendMessageClick = (values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) => {
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
          <Field as="textarea" placeholder="Enter your message" name="messageText" />
          <button type="submit" disabled={isSubmitting} >Send message</button>
        </Form>
      )}
    </Formik>
  )
}

export default Dialogs;