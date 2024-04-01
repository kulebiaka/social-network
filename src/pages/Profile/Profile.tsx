import React, { useEffect, useState } from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { getProfile } from '../../redux/profileReducer';
import Preloader from '../../components/Preloader/Preloader';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux';

const Profile = () => {

  const state = useAppSelector(state => ({ ...state.profilePage, ...state.authSlice }))
  const isAuth = useAppSelector(state => state.authSlice.isAuth)
  const authId = useAppSelector(state => state.authSlice.id)
  const userId: any = useParams().userId ?? state.id
  const isOwner = authId === userId
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
    if (userId === null) return
    dispatch(getProfile(userId))
  }, [userId, isAuth])


  return (
    <div className={s.content + ' app-content-container'}>

      {state.isFetching ?
        <Preloader /> :
        (<>
          <ProfileInfo status={state.user.status} isOwner={isOwner} />
          {/* <MyPosts /> */}
        </>)}

    </div>
  )
}

export default Profile;