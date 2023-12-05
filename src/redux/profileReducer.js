import { createSlice } from "@reduxjs/toolkit"
import { profileAPI } from "../API/api"


let initialState = {
  posts: [
    { id: 1, message: 'hi', likesCount: 23 },
    { id: 2, message: 'a', likesCount: 23 },
    { id: 3, message: 'b', likesCount: 23 },
    { id: 4, message: 'c', likesCount: 23 },
  ],
  isFetching: false,
  status: '',
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
    setUserProfile(state, action) {
      state.user = { ...action.payload, photos: action.payload.photos ?? state.user.photos, userId: action.payload.userId ?? state.user.userId }
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    uploadPhotoSuccess(state, action){
      state.user.photos = action.payload
    }
  }
})

export const getProfile = (id) => async (dispatch) => {
  dispatch(setIsFetching(true))
  let data = await profileAPI.getProfile(id)
  // .then(data => {
  dispatch(setUserProfile(data))
  dispatch(setIsFetching(false))
  // })
}

export const getStatus = (id) => async (dispatch) => {
  let response = await profileAPI.getStatus(id)
  // .then(response => {
  dispatch(setStatus(response.data))
  // })
}

export const setNewStatus = (status) => async (dispatch) => {
  let response = await profileAPI.putNewStatus(status)
  // .then(response => {
  // console.log(response.data)
  // })
  return response
}

export const uploadNewPhoto = (file) => async (dispatch) => {
  let response = await profileAPI.putNewPhoto(file)
  if(response.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(response.data.data.photos))
  }
  return response
}

export const setNewDataProfile = (data) => async (dispatch) => {
  let response = await profileAPI.putNewDataProfile(data)
  if(response.resultCode === 0){
    dispatch(setUserProfile(data))
  }
  return response
}

export const { addPost, deletePost, setUserProfile, setIsFetching, setStatus, uploadPhotoSuccess } = profileSlice.actions

export default profileSlice.reducer;