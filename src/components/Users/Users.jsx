import React, { useEffect } from "react";
import UserItem from "./UserItem/UserItem";
import s from "./Users.module.css"
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow, setUsers } from "../../redux/usersReducer";
// import axios from "axios";

let gotFromBackend = [
  {id:5, username:'Alex', followed: true, status:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', location:{country:'Russia', city:'Moscow'}},
  {id:6, username:'Ana', followed: false, status:'I want a rest', location:{country:'Russia', city:'Peterburg'}},
  {id:7, username:'Hanu', followed: false, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
  {id:8, username:'Anton', followed: true, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
]



const Users = (props) => {
  
  let dispatch = useDispatch()
  let state = useSelector(state => state.usersPage)

  // if(state.users.length === 0){
  //   axios.get('https://social-network.samuraijs.com/api/1.0/users')
  //     .then(response => dispatch(setUsers(response.data.items)))
  // }
  // useEffect(() => {
  //   axios.get('https://social-network.samuraijs.com/api/1.0/users')
  //     .then(response => dispatch(setUsers(response.data.items)))
  // }, [])

  // let onFollowClick = () => {
  //   dispatch(follow())
  // }

  // if(props.state.users.length === 0) {
  //   props.showMoreUsers([{id:1, username:'Alex', followed: true, status:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', location:{country:'Russia', city:'Moscow'}},
  //   {id:2, username:'Ana', followed: false, status:'I want a rest', location:{country:'Russia', city:'Peterburg'}},
  //   {id:3, username:'Hanu', followed: false, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
  //   {id:4, username:'Anton', followed: true, status:'I want a cake', location:{country:'Russia', city:'Moscow'}}])
  // }
  
  let usersComponents = state.users.map(user => (<UserItem user={user} />))


  return (
    <div className={s.container}>
      <h4>Users</h4>
      <div className={s.users}>{usersComponents}</div>
    <button className={s.showMore_btn} onClick={() => {dispatch(setUsers(gotFromBackend))}}>Show More</button>
    </div>
  )
}

export default Users;