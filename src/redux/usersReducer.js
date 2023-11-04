import { createSlice } from "@reduxjs/toolkit"

let initialState = {
  users: [
    // {id:1, username:'Alex', followed: true, status:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', location:{country:'Russia', city:'Moscow'}},
    // {id:2, username:'Ana', followed: false, status:'I want a rest', location:{country:'Russia', city:'Peterburg'}},
    // {id:3, username:'Hanu', followed: false, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
    // {id:4, username:'Anton', followed: true, status:'I want a cake', location:{country:'Russia', city:'Moscow'}},
  ]
  
}


const usersSlice = createSlice({
  name:'usersPage',
  initialState,
  reducers:{
    follow(state, action){
      state.users[action.payload-1].followed = true
    },
    unfollow(state, action){
      state.users[action.payload-1].followed = false
    },
    setUsers(state, action){
      state.users.push(...action.payload)
    },
  }
})

export const {follow, unfollow, setUsers} = usersSlice.actions

export default usersSlice.reducer