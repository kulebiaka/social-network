import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { usersAPI } from "../API/api"
import { updateObjectInArrayById } from "../utls/objectHelper"
import { AppThunk, UserType } from "../types/types"

type ActionFollowingProgress ={
  isFetching: boolean,
  id: number
}

type InitialStateType = {
  users: Array<UserType>,
  pageSize : number,
  currentPage : number,
  allUsersCount : number,
  isFetching: boolean,
  inFollowingProgress: Array<number>
}

let initialState : InitialStateType = {
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
  name: 'usersPage',
  initialState,
  reducers: {
    followSuccess(state, action) {
      state.users = updateObjectInArrayById(state.users, action.payload, 'id', { followed: true })
      // state.users = state.users.map((user) => {
      //   if (action.payload === user.id) {
      //     return { ...user, followed: true }
      //   }
      //   return user
      // })
    },
    unfollowSuccess(state, action) {
      state.users = updateObjectInArrayById(state.users, action.payload, 'id', { followed: false })
      // state.users = state.users.map((user) => {
      //   if (action.payload === user.id) {
      //     return { ...user, followed: false }
      //   }
      //   return user
      // })
    },
    toggleInFollowingProgress(state, action: PayloadAction<ActionFollowingProgress>) {
      if (action.payload.isFetching === true) {
        state.inFollowingProgress.push(action.payload.id)
      } else {
        state.inFollowingProgress = state.inFollowingProgress.filter(value => value !== action.payload.id)
      }
    },
    setUsers(state, action: PayloadAction<Array<UserType>>) {
      // if (state.users.length === 0) {
      //   state.users = action.payload
      // } else {
      state.users = action.payload
      // }
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setAllUsersCount(state, action: PayloadAction<number>) {
      state.allUsersCount = action.payload
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
    clearToInitialState(state) {
      state.users = []
    },
  }
})

export const getUsers = (currentPage : number, pageSize : number) : AppThunk => async (dispatch) => {
  dispatch(setIsFetching(true))
  let users = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setUsers(users))
  dispatch(setIsFetching(false))
}

export const getAllUsersCount = () : AppThunk => async (dispatch) => {
  let count = await usersAPI.getUsersCount()
  dispatch(setAllUsersCount(count))
}

const followUnfollowTemplate = async (dispatch: any, apiMethod : 'follow' | 'unfollow', id: number, actionCreator: any) => {
  dispatch(toggleInFollowingProgress({ isFetching: true, id }))
  let response = await usersAPI[apiMethod](id)

  if (response.data.resultCode === 0) { 
    console.log(response.data)
    dispatch(actionCreator(id))
  }

  dispatch(toggleInFollowingProgress({ isFetching: false, id }))
}

export const follow = (id: number) : AppThunk => (dispatch) => {
  followUnfollowTemplate(dispatch, 'follow', id, followSuccess)
}

export const unfollow = (id: number) : AppThunk => (dispatch) => {
  followUnfollowTemplate(dispatch, 'unfollow', id, unfollowSuccess)
}

export const { followSuccess, unfollowSuccess, toggleInFollowingProgress, setUsers, setCurrentPage, setAllUsersCount, setIsFetching, clearToInitialState } = usersSlice.actions

export default usersSlice.reducer