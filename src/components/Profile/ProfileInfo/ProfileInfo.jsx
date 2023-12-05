import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../common/Preloader';
import ProfileStatus from './ProfileStatus';
import ImgWithDefault from '../../common/ImgWithDefault';
import { setNewDataProfile, uploadNewPhoto } from '../../../redux/profileReducer';
import { Form, Formik, Field, ErrorMessage } from 'formik';

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false)
  let state = useSelector(state => ({ ...state.profilePage.user }))
  let authId = useSelector(state => state.authSlice.id)
  let isOwner = authId ===  state.userId
  let dispatch = useDispatch()

  if (!state) return <Preloader />

  const onUploadNewPhoto = (e) => {
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
            <ProfileStatus status={props.status} />
          </div>
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

const ProfileData = ({ aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, setEditMode, isOwner }) => {

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


const ProfileDataForm = ({ aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, setEditMode }) => {

  const dispatch = useDispatch()

  const onSaveProfileData = async (values, formik) => {
    formik.setSubmitting(true)
    let response = await dispatch(setNewDataProfile(values))
    if (response.resultCode === 0) {
      console.log(response)
      formik.setSubmitting(false)
      setEditMode(false)
    }else if(response.resultCode === 1){
      response.messages.forEach((error) => {
        if(error.includes('Invalid url format (Contacts')){
          let nameError = "contacts." + error.slice(error.indexOf('>')+1, -1).toLowerCase()
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
                  {key}: <Field key={key} name={"contacts." + key} value={contacts[key]}></Field><ErrorMessage name={"contacts." + key}/>
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