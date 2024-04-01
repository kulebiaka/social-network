import React, { useEffect } from 'react';
import s from './Dialogs.module.css';
import DialogPreview from './DialogPreview/DialogPreview';
import { getDialogById, getDialogs, setDialog } from '../../redux/dialogsReducer';
import { useAppDispatch, useAppSelector } from '../../redux';
import { useParams } from 'react-router-dom';
import Dialog from './Dialog/Dialog';

const Dialogs = () => {

  const dispatch = useAppDispatch()
  const userId = useParams().userId

  const state = useAppSelector(state => ({ ...state.dialogsPage, isAuth: state.authSlice.isAuth }))

  const dialogsComponents = state.dialogs.map((d) => (<DialogPreview dialog={d}  key={d.id} />))

  useEffect(() => {
    dispatch(getDialogs())
  }, [])

  // useEffect(() => {
    // if(userId) dispatch(setDialog(userId))
  // },[userId])

  return (
    <div className={s.dialogs}>

      <div className={s.dialogs_list + ' app-content-container'}>
        {dialogsComponents}
      </div>


      <div className={s.current_dialog + ' app-content-container'}>
        {userId ? 
        <Dialog userId={userId} key={userId}/> 
        :
        <h3 style={{lineHeight: '90vh', textAlign:'center'}}>Choose the dialog</h3>
      }
      </div>
    </div>
  )
}

export default Dialogs;