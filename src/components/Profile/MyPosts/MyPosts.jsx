import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import { addPost } from '../../../redux/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';


const MyPosts = (props) => {

  let state = useSelector(state => state.profilePage)

  let postsComponents = state.posts.map(p => (<Post message={p.message} likesCount={p.likesCount} />))

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