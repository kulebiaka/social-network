import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

let initialState = {
  users: [
      // {id:1, username:'Alex', followed: true, status:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', location:{country:'Russia', city:'Moscow'}},
      // {id:2, username:'Ana', followed: false, status:'I want a rest', location:{country:'Russia', city:'Peterburg'}},
      // {id:3, username:'Hanu', followed: false, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
      // {id:4, username:'Anton', followed: true, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
    ],
    pageSize: 10, 
    currentPage: 1, 
    allUsersCount: 0,
    isFetching: false,
    inFollowingProgress: []
}

let usersSlice = createSlice({
  name:'usersPage',
  initialState,
  reducers:{
    follow(state, action){
      state.users = state.users.map((user) => {
        if (action.payload === user.id){
          return {...user, followed: true}
        }
        return user
      })
    },
    unfollow(state, action){
      state.users = state.users.map((user) => {
        if (action.payload === user.id){
          return {...user, followed: false}
        }
        return user
      })
    },
    toggleInFollowingProgress(state, action){
      if(action.payload.isFetching){
        state.inFollowingProgress.push(action.payload.id)
      }else{
        state.inFollowingProgress = state.inFollowingProgress.filter(value => value != action.payload.id)
      }
    },
    setUsers(state, action){
      if(state.users.length === 0){
        state.users = action.payload
      }else{
        state.users = [...state.users, ...action.payload]
      }
    },
    setCurrentPage(state,action){
      state.currentPage = action.payload
    },
    setAllUsersCount(state, action){
      state.allUsersCount = action.payload
    },
    setIsFetching(state, action){
      state.isFetching = action.payload
    },
    clearToInitialState(state){
      state.users = []
    },
  }
})

export const {follow, unfollow, toggleInFollowingProgress, setUsers, setCurrentPage, setAllUsersCount, setIsFetching, clearToInitialState} = usersSlice.actions

export default usersSlice.reducer