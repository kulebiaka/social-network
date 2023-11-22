import React from 'react';
import s from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateField } from '../../redux/formReducer';
import { authAPI } from '../../API/api';

const Login = () => {

  let state = useSelector(state => state.authSlice)

  return (<div className={s.container}>
    <LoginForm />
  </div>)
}

const LoginForm = () => {

  const dispatch = useDispatch();
  const form = useSelector(state => state.form);

  const loginFormValidation = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'invalid email address';
    }
    if (!values.password) {
      errors.password = 'required'
    }
    return errors;
  }

  const onLoginFormSubmit = (values, { setSubmitting }) => {
    authAPI.login(values)
      .then(response => {
        if (response.resultCode !== 0) console.log('something went wrong')
        setSubmitting(false);
      })
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 400);
  }

  // const handleChange = (field) => (evt) => {
  //   dispatch(updateField({field, value: evt.target.value}))
  // }

  return (<div className={s.loginForm}>
    <Formik
      initialValues={{
      email: '',
      password: '',
      rememberMe: false,
      // errors: {}
      }}
      validate={loginFormValidation}
      onSubmit={onLoginFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={s.fieldContainer}>
            <Field type="email" name="email" placeholder='Enter your email' className={s.field}/>
            <ErrorMessage name="email" component="div" className={s.error}/>
          </div>
          <div className={s.fieldContainer}>
            <Field type="password" name="password" placeholder='Enter your password' className={s.field}/>
            <ErrorMessage name="password" component="div" className={s.error}/>
          </div>
          <div className={s.fieldContainer}>
            <label htmlFor="rememberMe">Remember me</label>
            <Field type="checkbox" name="rememberMe" className={s.field}/>
          </div>
          <button type="submit" disabled={isSubmitting} className={s.submit}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>)
}

export default Login