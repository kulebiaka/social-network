import React, { useEffect, useState } from "react";
import UserItem from "./UserItem/UserItem";
import s from "./Users.module.css"
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow, setUsers, setCurrentPage, setAllUsersCount, setIsFetching, clearToInitialState } from "../../redux/usersReducer";
import axios from "axios";
import Preloader from "../common/Preloader";

let gotFromBackend = [
  {id:5, name:'Alex', followed: true, status:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', location:{country:'Russia', city:'Moscow'}},
  {id:6, name:'Ana', followed: false, status:'I want a rest', location:{country:'Russia', city:'Peterburg'}},
  {id:7, name:'Hanu', followed: false, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
  {id:8, name:'Anton', followed: true, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
]



const Users = (props) => {
  
  let dispatch = useDispatch()
  let state = useSelector(state => state.usersPage)

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users`)
      .then(response => {
        // dispatch(setUsers(response.data.items))
        dispatch(setAllUsersCount(response.data.totalCount))
      })
    console.log('mounted')
    return () => {dispatch(clearToInitialState())}
  }, [])

  useEffect(() => {
    dispatch(setIsFetching(true))
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${state.currentPage}&count=${state.pageSize}`, {withCredentials: true})
      .then(response => {
        dispatch(setIsFetching(false))
        dispatch(setUsers(response.data.items))
      })
  }, [state.currentPage])

  let usersComponents = state.users.map(user => (<UserItem user={user} key={user.id}/>)) 

  return (
    <div className={s.container}>
      <h4>Users</h4>
      <div className={s.users}>{usersComponents}</div>
      {state.isFetching ? 
        <Preloader /> 
        : <button className={s.showMore_btn} onClick={() => {dispatch(setCurrentPage(state.currentPage + 1))}}>Show More</button>
      }
      
    </div>
  )
}

export default Users;