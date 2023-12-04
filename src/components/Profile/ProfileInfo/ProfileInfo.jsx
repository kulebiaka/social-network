import React from 'react';
import s from './ProfileInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../common/Preloader';
import ProfileStatus from './ProfileStatus';
import ImgWithDefault from '../../common/ImgWithDefault';
import { uploadNewPhoto } from '../../../redux/profileReducer';

const ProfileInfo = (props) => {

  let state = useSelector(state => ({...state.profilePage.user, authId: state.authSlice.id}))
  let dispatch = useDispatch()

  if (!state) return <Preloader />

  const onUploadNewPhoto = (e) => {
    if(e.target.files.length){
      dispatch(uploadNewPhoto(e.target.files[0]))
    }
  }

  return (
    <div className={s.container}>
      {/* <div>
        <img src='https://tinypng.com/images/social/website.jpg' />
      </div> */} 
      <div className={s.head}>
        <div className={s.avatar}>
          {/* <img src={state.photos.large || 'https://media.istockphoto.com/id/1300845620/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-icon-flat-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0.jpg?s=612x612&w=0&k=20&c=Po5TTi0yw6lM7qz6yay5vUbUBy3kAEWrpQmDaUMWnek='} alt="" /> */}
          <ImgWithDefault imgUrl={state.photos?.large}/>
          {state.authId === state.userId && <input type={'file'} onChange={onUploadNewPhoto}/>}
        </div>
        <div className={s.description}>
          <h3>
            {state.fullName}
          </h3>
          <div>
            <ProfileStatus status={props.status}/> 
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileInfo;