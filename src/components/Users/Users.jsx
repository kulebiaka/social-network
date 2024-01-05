import React, { useEffect, useState } from "react";
import UserItem from "./UserItem/UserItem";
import s from "./Users.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setAllUsersCount, clearToInitialState, getUsers, getAllUsersCount } from "../../redux/usersReducer";
import axios from "axios";
import Preloader from "../common/Preloader";
import { usersAPI } from "../../API/api";
import Paginator from "../common/Paginator";

const Users = (props) => {

  let dispatch = useDispatch()
  let state = useSelector(state => state.usersPage)

  useEffect(() => {
    dispatch(getAllUsersCount())
    return () => { dispatch(clearToInitialState()) }
  }, [])

  useEffect(() => {
    dispatch(getUsers(state.currentPage, state.pageSize))
  }, [state.currentPage])

  let usersComponents = state.users.map(user => (<UserItem inFollowingProgress={state.inFollowingProgress} user={user} key={user.id} />))

  return (
    <div className={s.container}>
      <h4>Users</h4>
      <Paginator elementsCount={state.allUsersCount} pageSize={state.pageSize}
      currentPage={state.currentPage} setCurrentPage={(p) => {dispatch(setCurrentPage(p))}} 
      portionSize={10} />
      {state.isFetching ? <Preloader/> : <div className={s.users}>{usersComponents}</div>}
      {/* {state.isFetching ?
        <Preloader />
        : <button className={s.showMore_btn} onClick={() => { dispatch(setCurrentPage(state.currentPage + 1)) }}>Show More</button>
      } */}

    </div>
  )
}

export default Users;