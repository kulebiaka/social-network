import React, { useEffect, useState } from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatus } from '../../redux/profileReducer';
import Preloader from '../common/Preloader';
import { useParams, useNavigate } from 'react-router-dom';
// import { profileAPI } from '../../API/api';

const Profile = (props) => {

  let state = useSelector(state => ({...state.profilePage, isAuth: state.authSlice.isAuth}))
  let dispatch = useDispatch()
  let userId = useParams().userId
  let navigate = useNavigate()

  useEffect(() => {
    // if(!state.isAuth) {
    //   navigate('/login')
    //   return
    // }

    dispatch(getStatus(userId))
    dispatch(getProfile(userId))
  }, [userId])


  return (
    <div className={s.content}>
      {state.isFetching ? <Preloader /> : (<><ProfileInfo status={state.status} />
        <MyPosts
        // store={props.store}
        /></>)}
    </div>
  )
}

export default Profile;