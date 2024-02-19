import { usersAPI } from './../API/usersApi';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updateObjectInArrayById } from "../utls/objectHelper"
import { AppThunk, UserType } from "../types/types"

type ActionFollowingProgress = {
  isFetching: boolean,
  id: number
}

export type SearchFilterType = {
  term: string,
  friend?: boolean
}

type InitialStateType = {
  users: Array<UserType>,
  pageSize: number,
  currentPage: number,
  searchFilter: SearchFilterType
  usersCount: number,
  isFetching: boolean,
  inFollowingProgress: Array<number>
}

const initialState: InitialStateType = {
  users: [],
  pageSize: 10,
  currentPage: 1,
  searchFilter: {
    term: '',
    friend: undefined
  },
  usersCount: 0,
  isFetching: false,
  inFollowingProgress: []
}

const usersSlice = createSlice({
  name: 'usersPage',
  initialState,
  reducers: {
    followSuccess(state, action) {
      state.users = updateObjectInArrayById(state.users, action.payload, 'id', { followed: true })
    },
    unfollowSuccess(state, action) {
      state.users = updateObjectInArrayById(state.users, action.payload, 'id', { followed: false })
    },
    toggleInFollowingProgress(state, action: PayloadAction<ActionFollowingProgress>) {
      if (action.payload.isFetching === true) {
        state.inFollowingProgress.push(action.payload.id)
      } else {
        state.inFollowingProgress = state.inFollowingProgress.filter(value => value !== action.payload.id)
      }
    },
    setFilter(state, action) {
      state.searchFilter = action.payload
    },

    setUsers(state, action: PayloadAction<Array<UserType>>) {
      state.users = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setUsersCount(state, action: PayloadAction<number>) {
      state.usersCount = action.payload
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
    resetUsers(state) {
      state.users = []
    },
  }
})

export const getUsers = (currentPage: number, pageSize: number, term?: string, friend?: boolean | string): AppThunk => async (dispatch) => {
  dispatch(setIsFetching(true))
  const res = await usersAPI.getUsers(currentPage, pageSize, term, friend)
  dispatch(setUsersCount(res.totalCount))
  dispatch(setUsers(res.items))
  dispatch(setIsFetching(false))
  return res;
}

const _followUnfollowTemplate = async (dispatch: any, apiMethod: 'follow' | 'unfollow', id: number, actionCreator: any) => {
  dispatch(toggleInFollowingProgress({ isFetching: true, id }))
  const response = await usersAPI[apiMethod](id)

  if (response.data.resultCode === 0) {
    console.log(response.data)
    dispatch(actionCreator(id))
  }

  dispatch(toggleInFollowingProgress({ isFetching: false, id }))
}

export const follow = (id: number): AppThunk => (dispatch) => {
  _followUnfollowTemplate(dispatch, 'follow', id, followSuccess)
}

export const unfollow = (id: number): AppThunk => (dispatch) => {
  _followUnfollowTemplate(dispatch, 'unfollow', id, unfollowSuccess)
}

export const { followSuccess, unfollowSuccess, toggleInFollowingProgress,
  setFilter, setUsers, setCurrentPage, setUsersCount, setIsFetching, resetUsers } = usersSlice.actions

export default usersSlice.reducer