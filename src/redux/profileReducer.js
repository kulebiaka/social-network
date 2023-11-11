import { createSlice } from "@reduxjs/toolkit"


let initialState = {
  posts: [
    { id: 1, message: 'hi', likesCount: 23 },
    { id: 2, message: 'a', likesCount: 23 },
    { id: 3, message: 'b', likesCount: 23 },
    { id: 4, message: 'c', likesCount: 23 },
  ],
  newPostText: '',
  isFetching: false
}

const profileSlice = createSlice({
  name:'profilePage',
  initialState,
  reducers: {
    addPost(state){
      let newPost = {
        id: (state.posts.length + 1),
        message: state.newPostText,
        likesCount: 0
      }
      state.newPostText = ''
      state.posts.push(newPost)
    },
    updateNewPostText(state, action){
      state.newPostText = action.payload
    },
    setUserProfile(state, action){
      state.user = {...action.payload}
    },
    setIsFetching(state, action){
      state.isFetching = action.payload
    },
  }
})


export const {addPost, updateNewPostText, setUserProfile, setIsFetching} = profileSlice.actions

export default profileSlice.reducer;