import React, { useEffect, useState } from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile, setIsFetching } from '../../redux/profileReducer';
import Preloader from '../common/Preloader';
import { useParams } from 'react-router-dom';
import { profileAPI } from '../../API/api';

const Profile = (props) => {

  let state = useSelector(state => (state.profilePage))
  let dispatch = useDispatch()
  let userId = useParams().userId 

  console.log(userId)

  const setProfile = () => {
    dispatch(setIsFetching(true))
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    profileAPI.getProfile(userId)
      .then(data => {
        console.log(data)
        dispatch(setUserProfile(data))
        dispatch(setIsFetching(false))
      })
  }

  useEffect(() => {
    setProfile()
  }, [])


  return (
    <div className={s.content}>
      {state.isFetching ? <Preloader /> : (<><ProfileInfo />
        <MyPosts
        // store={props.store}
        /></>)}
    </div>
  )
}

export default Profile;