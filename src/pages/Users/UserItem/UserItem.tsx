import React from "react";
import s from './UserItem.module.css'
import { follow, unfollow } from "./../../../redux/usersReducer"
import { NavLink } from "react-router-dom";
import ImgWithDefault from "./../../../components/ImgWithDefault";
import { UserType } from "../../../lib/types";
import { useAppDispatch } from "../../../redux";
import { Button } from "antd";

type PropsType = { 
  user: UserType, 
  inFollowingProgress: Array<number> 
}

const UserItem = (props: PropsType) => {

  const dispatch = useAppDispatch()

  return (
    <div className={s.user} key={props.user.id}>

      <NavLink to={'/profile/' + props.user.id} className={s.avatar}>
        <ImgWithDefault imgUrl={props.user.photos.large} />
      </NavLink>

      {props.user.followed ?
        <Button disabled={props.inFollowingProgress.includes(props.user.id)}
          className={s.follow} onClick={() => { dispatch(unfollow(props.user.id)) }}>
          Unfollow
        </Button> :
        <Button disabled={props.inFollowingProgress.includes(props.user.id)}
          className={s.follow} onClick={() => { dispatch(follow(props.user.id)) }}>
          Follow
        </Button>}

      <div className={s.description}>
        <div className={s.username}>{props.user.name}</div>
        <div className={s.status}>{props.user.status}</div>
      </div>
    </div>
  )
}

export default UserItem