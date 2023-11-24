import React, { useEffect } from 'react';
import s from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { authAPI } from '../../API/api';
import { logIn, setUserIfLoggedIn } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const state = useSelector(state => state.authSlice)
  const navigate = useNavigate()

  useEffect(() => {
    if(state.isAuth) navigate(`/profile/${state.id}`)
  },)

  return (<div className={s.container}>
    <LoginForm />
  </div>)
}

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

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
    // authAPI.login(values)
    //   .then(response => {
    //     if (response.resultCode === 0){
    //       dispatch(setUserIfLoggedIn())
    //     }
    //   })
    dispatch(logIn(values))
      .then(response => {
        setSubmitting(false);
        if (response.resultCode === 0) {
          navigate('/profile')
        }
      })
  }


  return (<div className={s.loginForm}>
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validate={loginFormValidation}
      onSubmit={onLoginFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={s.fieldContainer}>
            <Field type="email" name="email" placeholder='Enter your email' className={s.field} />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>
          <div className={s.fieldContainer}>
            <Field type="password" name="password" placeholder='Enter your password' className={s.field} />
            <ErrorMessage name="password" component="div" className={s.error} />
          </div>
          <div className={s.fieldContainer}>
            <label htmlFor="rememberMe">Remember me</label>
            <Field type="checkbox" name="rememberMe" className={s.field} />
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