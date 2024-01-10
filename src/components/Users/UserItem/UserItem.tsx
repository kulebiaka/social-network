import React from "react";
import s from './UserItem.module.css'
import { follow, unfollow } from "./../../../redux/usersReducer"
import { NavLink } from "react-router-dom";
import ImgWithDefault from "../../common/ImgWithDefault";
import { UserType } from "../../../types/types";
import { useAppDispatch } from "../../../redux/store";

const UserItem = (props: {user: UserType, inFollowingProgress: Array<number>}) => {

  let dispatch = useAppDispatch()

  return (
  <div className={s.user} key={props.user.id}>

    <NavLink to={'/profile/'+props.user.id}  className={s.avatar}>
      <ImgWithDefault imgUrl={props.user.photos.large} />
    </NavLink>

    {props.user.followed ? 
      <button disabled={props.inFollowingProgress.includes(props.user.id)}
      className={s.follow} onClick={() => {dispatch(unfollow(props.user.id))}}>
        Unfollow
      </button> : 
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