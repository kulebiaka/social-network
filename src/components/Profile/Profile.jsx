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

  let state = useSelector(state => ({...state.profilePage, ...state.authSlice}))
  let dispatch = useDispatch()
  let userId = useParams().userId || state.id
  console.log(userId)
  let navigate = useNavigate()

  useEffect(() => {
    // if(!state.isAuth) {
    //   navigate('/login')
    //   return
    // }

    if(userId === null) return

    dispatch(getStatus(userId))
    dispatch(getProfile(userId))
  }, [userId])

  if(!state){
    return <Preloader />
  }


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