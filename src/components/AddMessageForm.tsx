import React, { useState } from 'react';
import { useAppDispatch } from '../redux';
import { Input } from 'antd';
import { Button } from 'antd/es/radio';

type ValuesType = {
  messageText: string;
};
const AddMessageForm = ({ sendMessage }: any) => {

  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSendMessageClick = () => {
    setIsSubmitting(true)
    sendMessage(message).then(() => {
      setIsSubmitting(false);
      setMessage('')
    })
  };

  return (
      
        <form style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Input.TextArea
            value={message}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 2, maxRows: 4 }}
            onChange={ (e) => {setMessage(e.target.value)}}
          />

          <Button style={{minWidth: '120px'}} type="submit" onClick={onSendMessageClick} disabled={isSubmitting || message.length === 0}>Send message</Button>
        </form>

  );
};

export default AddMessageForm
