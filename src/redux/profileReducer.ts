import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileAPI } from "../API/api"
import { AppThunk, ProfileUserType, PostType } from "../types/types"

let initialState = {
  posts: [
    { id: 1, message: 'hi', likesCount: 23 },
    { id: 2, message: 'a', likesCount: 23 },
    { id: 3, message: 'b', likesCount: 23 },
    { id: 4, message: 'c', likesCount: 23 },
  ] as Array<PostType>,
  isFetching: false,
  status: '',
  user: null as ProfileUserType | null
}

const profileSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    addPost(state, action) {
      let newPost = {
        id: (state.posts.length + 1),
        message: action.payload,
        likesCount: 0
      }
      state.posts.push(newPost)
    },
    deletePost(state, action) {
      return { ...state, posts: state.posts.filter((p) => p.id !== action.payload) }
    },
    setUserProfile(state, action : PayloadAction<ProfileUserType>) {
      state.user = { ...action.payload, photos: action.payload.photos ?? state.user?.photos, userId: action.payload.userId ?? state.user?.userId }
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    uploadPhotoSuccess(state, action){
      if(state.user!== null){
        state.user.photos = action.payload
      }
    }
  }
})

export const getProfile = (id: number) : AppThunk => async (dispatch) => {
  dispatch(setIsFetching(true))
  let data = await profileAPI.getProfile(id)
  dispatch(setUserProfile(data))
  dispatch(setIsFetching(false))
}

export const getStatus = (id: number) : AppThunk => async (dispatch) => {
  let response = await profileAPI.getStatus(id)
  dispatch(setStatus(response.data))
}

export const setNewStatus = (status: string) : AppThunk => async (dispatch) => {
  let response = await profileAPI.putNewStatus(status)
  return response
}

export const uploadNewPhoto = (file: File) : AppThunk => async (dispatch) => {
  let response = await profileAPI.putNewPhoto(file)
  if(response.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(response.data.data.photos))
  }
  return response
}

export const setNewDataProfile = (data: ProfileUserType) : AppThunk => async (dispatch) => {
  let response = await profileAPI.putNewDataProfile(data)
  if(response.resultCode === 0){
    dispatch(setUserProfile(data))
  }
  return response
}

export const { addPost, deletePost, setUserProfile, setIsFetching, setStatus, uploadPhotoSuccess } = profileSlice.actions

export default profileSlice.reducer;