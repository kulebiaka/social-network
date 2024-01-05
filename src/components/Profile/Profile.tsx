import React, { useEffect, useState } from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatus } from '../../redux/profileReducer';
import Preloader from '../common/Preloader';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
// import { profileAPI } from '../../API/api';

const Profile = () => {

  let state = useAppSelector(state => ({...state.profilePage, ...state.authSlice}))
  let authId: number | null = useAppSelector(state => state.authSlice.id)
  let userId: any = useParams().userId ?? state.id
  let isOwner = authId === userId
  let dispatch = useAppDispatch()
  let navigate = useNavigate()
  
  useEffect(() => {
    if(state.isAuth === false) {
      navigate('/login')
      return
    }

    if(userId === null) return

    dispatch(getStatus(userId))
    dispatch(getProfile(userId))

  }, [userId])


  return (
    <div className={s.content}>
      {state.isFetching ? <Preloader /> : (<><ProfileInfo status={state.status} isOwner={isOwner}/>
        <MyPosts
        // store={props.store}
        /></>)}
    </div>
  )
}

export default Profile;