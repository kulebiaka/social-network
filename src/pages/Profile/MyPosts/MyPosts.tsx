import React from 'react';
import s from './MyPosts.module.css';
import Post from '../../../components/Post/Post'
import { useSelector } from 'react-redux';
import Preloader from '../../../components/Preloader/Preloader';
import { useAppSelector } from '../../../redux';
import { AddPostForm } from './AddPostForm';


const MyPosts = () => {

  let state = useAppSelector(state => state.profilePage)

  if (!state.user) return <Preloader />

  let postsComponents = state.posts.map(p => (<Post message={p.message} likesCount={p.likesCount} photoUrl={state?.user?.photos?.small} />))

  return (
    <div className={s.posts_block}>
      <h3>My posts</h3>
      <AddPostForm />
      <div className={s.posts}>
        {postsComponents}
      </div>
    </div>)
}

export default MyPosts;