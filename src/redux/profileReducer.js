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
    setUserProfile(state, action) {
      state.user = { ...action.payload }
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    }
  }
})

export const getProfile = (id) => (dispatch) => {
  dispatch(setIsFetching(true))
  profileAPI.getProfile(id)
    .then(data => {
      console.log(data)
      dispatch(setUserProfile(data))
      dispatch(setIsFetching(false))
    })
}

export const getStatus = (id) => (dispatch) => {
  profileAPI.getStatus(id)
    .then(response => {
      console.log(response)
      dispatch(setStatus(response.data))
    })
}

export const setNewStatus = (status) => (dispatch) => {
  profileAPI.putNewStatus(status)
    .then(response => {
      console.log(response.data)
    })
}


export const { addPost, setUserProfile, setIsFetching, setStatus } = profileSlice.actions

export default profileSlice.reducer;