import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts';

const Profile = (props) => {

  return (
    <div className={s.content}>
      <ProfileInfo />
      <MyPosts 
        // store={props.store}
      />
    </div>
  )
}

export default Profile;