import React, { useEffect } from 'react';
import s from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { authAPI } from '../../API/api';
import { getCaptcha, logIn, setUserIfLoggedIn } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const state = useSelector(state => ({ isAuth: state.authSlice.isAuth }))
  const navigate = useNavigate()

  useEffect(() => {
    if (state.isAuth) navigate(`/profile`)
  })

  return (<div className={s.container}>
    <LoginForm />
  </div>)
}

const LoginForm = () => {

  const dispatch = useDispatch();
  const captchaUrl = useSelector(state => state.authSlice.captchaUrl)
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

  const onLoginFormSubmit = (values, formik) => {
    formik.setSubmitting(true)

    dispatch(logIn(values))
      .then(response => {
        console.log(response)
        if (response.resultCode === 0) {
          dispatch(setUserIfLoggedIn())
          formik.resetForm()
          navigate('/profile')
        } else if (response.resultCode === 1) {
          formik.setFieldValue('password', '')
            .then(() => {
              formik.setFieldError('common', response.messages[0])
            })
        } else {
          dispatch(getCaptcha())
        }
        formik.setSubmitting(false);
      })
  }


  return (<div className={s.loginForm}>
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
      }}
      validate={loginFormValidation}
      onSubmit={onLoginFormSubmit}
    >
      {({ isSubmitting, errors, values }) => (
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
          {errors.common && <div className={s.error}>{errors.common}</div>}
          {captchaUrl && <div>
            <img src={captchaUrl} alt="" />
            <Field type="text" name="captcha"></Field>
          </div>}
          <button type="submit" disabled={isSubmitting} className={s.submit}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>)
}


export default Login;