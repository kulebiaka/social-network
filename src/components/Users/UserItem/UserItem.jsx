import React from "react";
import s from './UserItem.module.css'
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "./../../../redux/usersReducer"
import { NavLink } from "react-router-dom";

const UserItem = (props) => {

  let dispatch = useDispatch()

  // let onFollowClick = () => {
  //   dispatch(toggleInFollowingProgress({isFetching: true, id: props.user.id}))
  //   usersAPI.follow(props.user.id)
  //     .then((response) => {
  //       console.log(response.data)
  //       dispatch(follow(props.user.id))
  //       dispatch(toggleInFollowingProgress({isFetching: false, id: props.user.id}))
  //     })
  // }
  // let onUnfollowClick = () => {
  //   dispatch(toggleInFollowingProgress({isFetching: true, id: props.user.id}))
  //   usersAPI.unfollow(props.user.id)
  //     .then((response) => {
  //       console.log(response.data)
  //       dispatch(unfollow(props.user.id))
  //       dispatch(toggleInFollowingProgress({isFetching: false, id: props.user.id}))
  //     })
  // }

  return (
  <div className={s.user} key={props.user.id}>

    <NavLink to={'/profile/'+props.user.id}  className={s.avatar}>
      <img src='https://media.istockphoto.com/id/1300845620/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-icon-flat-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0.jpg?s=612x612&w=0&k=20&c=Po5TTi0yw6lM7qz6yay5vUbUBy3kAEWrpQmDaUMWnek=' alt='' />
    </NavLink>

    {props.user.followed ? 
      <button disabled={props.inFollowingProgress.includes(props.user.id)}
      className={s.follow} onClick={() => {dispatch(unfollow(props.user.id))}}>
        Unfollow
      </button>: 
      <button disabled={props.inFollowingProgress.includes(props.user.id)}
      className={s.follow} onClick={() => {dispatch(follow(props.user.id))}}>
        Follow
      </button>}
  
    <div className={s.description}>
      <div className={s.username}>{props.user.name}</div>
      <div className={s.status}>{props.user.status}</div>
      <div className={s.location}>
        {/* {props.user.location.country}, {props.user.location.city} */}
        location
        </div>
    </div>
  </div>
  )
}

export default UserItem