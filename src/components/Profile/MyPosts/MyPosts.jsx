import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import { addPost } from '../../../redux/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import Preloader from '../../common/Preloader';


const MyPosts = (props) => {

  let state = useSelector(state => state.profilePage)

  if(!state.user) return <Preloader />

  let postsComponents = state.posts.map(p => (<Post message={p.message} likesCount={p.likesCount} photoUrl={state?.user.photos.small || 'https://media.istockphoto.com/id/1300845620/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-icon-flat-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0.jpg?s=612x612&w=0&k=20&c=Po5TTi0yw6lM7qz6yay5vUbUBy3kAEWrpQmDaUMWnek='}/>))

  return (
    <div className={s.posts_block}>
      <h3>My posts</h3>
      <AddPostForm />
      <div className={s.posts}>
        {postsComponents}
      </div>
    </div>)
}

const AddPostForm = () => {

  const dispatch = useDispatch()

  const onAddPostClick = (values, { setSubmitting }) => {
    dispatch(addPost(values.postText))
    setSubmitting(false)
    values.postText = ''
  }

  return (
  <Formik
    initialValues={{postText: ''}}
    onSubmit={onAddPostClick}
  >
    <Form>
      <Field as='textarea' name='postText'/>
      <button>Add post</button>
    </Form>
  </Formik>
  )
}

export default MyPosts;