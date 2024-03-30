import React from 'react';
import { addPost } from '../../../redux/profileReducer';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FormikHelpers } from 'formik';

export const AddPostForm = () => {

  const dispatch = useDispatch();

  const initialState = { postText: '' };

  const onAddPostClick = (values: typeof initialState, { setSubmitting }: FormikHelpers<typeof initialState>) => {
    dispatch(addPost(values.postText));
    setSubmitting(false);
    values.postText = '';
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={onAddPostClick}
    >
      <Form>
        <Field as='textarea' name='postText' />
        <button>Add post</button>
      </Form>
    </Formik>
  );
};
