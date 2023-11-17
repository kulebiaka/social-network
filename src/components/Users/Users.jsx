import React, { useEffect, useState } from "react";
import UserItem from "./UserItem/UserItem";
import s from "./Users.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setAllUsersCount, clearToInitialState, getUsers, getAllUsersCount } from "../../redux/usersReducer";
import axios from "axios";
import Preloader from "../common/Preloader";
import { usersAPI } from "../../API/api";

let gotFromBackend = [
  { id: 5, name: 'Alex', followed: true, status: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', location: { country: 'Russia', city: 'Moscow' } },
  { id: 6, name: 'Ana', followed: false, status: 'I want a rest', location: { country: 'Russia', city: 'Peterburg' } },
  { id: 7, name: 'Hanu', followed: false, status: 'I want a cake', location: { country: 'Russia', city: 'Moscow' } },
  { id: 8, name: 'Anton', followed: true, status: 'I want a cake', location: { country: 'Russia', city: 'Moscow' } },
]



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
      <div className={s.users}>{usersComponents}</div>
      {state.isFetching ?
        <Preloader />
        : <button className={s.showMore_btn} onClick={() => { dispatch(setCurrentPage(state.currentPage + 1)) }}>Show More</button>
      }

    </div>
  )
}

export default Users;