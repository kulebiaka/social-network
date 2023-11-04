import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import { addPost, updateNewPostText } from '../../../redux/profileReducer';
import { useDispatch, useSelector } from 'react-redux';


const MyPosts = (props) => {

  let state = useSelector(state => state.profilePage)
  let dispatch = useDispatch();

  let postsComponents = state.posts.map(p => (<Post message={p.message} likesCount={p.likesCount} />))

  let onAddPostClick = () => {
    dispatch(addPost())
  }
  let onNewPostChange = (e) => {
    dispatch(updateNewPostText(e.target.value))
  }
  debugger
  return (
    <div className={s.posts_block}>
      <h3>My posts</h3>
      <div>
        <textarea 
          placeholder='Enter your text'
          onChange={onNewPostChange} 
          value={state.newPostText}
        />
        <button onClick={onAddPostClick}>New post</button>
      </div>
      <div className={s.posts}>
        {postsComponents}
      </div>
    </div>)
}

export default MyPosts;