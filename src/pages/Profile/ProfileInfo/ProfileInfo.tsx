import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../components/Preloader/Preloader';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import ImgWithDefault from '../../../components/ImgWithDefault';
import { setNewDataProfile, uploadNewPhoto } from '../../../redux/profileReducer';
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { ProfileUserType } from '../../../lib/types';
import { Button } from 'antd';
import { startChat } from '../../../redux/dialogsReducer';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ status = '', isOwner }: { status?: string, isOwner: boolean }) => {

  const [editMode, setEditMode] = useState<boolean>(false)
  const state = useAppSelector(state => ({ ...state.profilePage.user }))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!state) return <Preloader />

  const onStartChat = () => {
    dispatch(startChat(state.userId))
      .then(() => navigate(`/dialogs/${state.userId}`))
  }

  const onUploadNewPhoto = (e: any) => {
    if (e.target.files.length) {
      dispatch(uploadNewPhoto(e.target.files[0]))
    }
  }

  return (
    <div className={s.container}>
      <div className={s.head}>
        <div className={s.avatar}>
          <ImgWithDefault imgUrl={state.photos?.large} />
          {isOwner && <input type={'file'} onChange={onUploadNewPhoto} />}
        </div>
        <div className={s.description}>
          <h3>
            {state.fullName}
          </h3>
          <div>
            <ProfileStatus status={status} isOwner={isOwner} />
          </div>
          {!isOwner && <Button onClick={onStartChat}>Start chat</Button>}
        </div>
      </div>

      {editMode ? (
        <ProfileDataForm {...state} setEditMode={setEditMode} />
      ) : (
        <ProfileData {...state} setEditMode={setEditMode} isOwner={isOwner} />
      )}

    </div>
  )
}

interface ProfileFormProps extends ProfileUserType {
  setEditMode: (a: boolean) => void,
}
interface ProfileDataProps extends ProfileFormProps {
  isOwner: boolean
}

const ProfileData = ({ aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, setEditMode, isOwner }: ProfileDataProps) => {

  return (<div>
    {isOwner && <button className={s.editMode} onClick={() => { setEditMode(true) }}>Edit</button>}
    <div>About Me: {aboutMe}</div>
    <div><b>Contacts:</b>
      {contacts && Object.keys(contacts).map((key) => (<div style={{ paddingLeft: '10px' }}>{key}: {contacts[key]}</div>))}
    </div>
    <div>looking for a job: {lookingForAJob ? 'yes' : 'no'}</div>
    <div>looking job description: {lookingForAJobDescription}</div>
    <div>fullName: {fullName}</div>
  </div>)

}


const ProfileDataForm = ({ aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, setEditMode }: any) => {

  const dispatch = useAppDispatch()

  const onSaveProfileData = async (values: any, formik: any) => {
    formik.setSubmitting(true)
    let response: any = await dispatch(setNewDataProfile(values))
    console.log(response)
    if (response.resultCode === 0) {
      formik.setSubmitting(false)
      setEditMode(false)
    } else if (response.resultCode === 1) {
      response.messages.forEach((error: any) => {
        if (error.includes('Invalid url format (Contacts')) {
          let nameError = "contacts." + error.slice(error.indexOf('>') + 1, -1).toLowerCase()
          formik.setFieldError(nameError, "Invalid url Format")
        }
      })
    }
  }

  return (
    <Formik
      initialValues={{ aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName }}
      onSubmit={onSaveProfileData}
    >
      {({ isSubmitting }) => (
        <Form>
          <button type="submit" className={s.editMode} disabled={isSubmitting}>Save</button>
          <div>
            <div>About Me: <Field type="text" name="aboutMe"></Field></div>

            <div><b>Contacts:</b>
              <div style={{ paddingLeft: '10px' }}>
                {contacts && Object.keys(contacts).map((key) => (<div>
                  {key}: <Field key={key} type="text" name={`contacts.${key}`}></Field><ErrorMessage name={"contacts." + key} />
                </div>))}
              </div>
            </div>

            <div>looking for a job: <Field type="checkbox" name="lookingForAJob"></Field></div>
            <div>looking job description: <Field name="lookingForAJobDescription"></Field></div>
            <div>fullName: <Field type="text" name="fullName"></Field></div>
          </div>
        </Form>
      )}
    </Formik>)
}

export default ProfileInfo;