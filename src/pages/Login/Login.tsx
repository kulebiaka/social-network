import React, { useEffect } from 'react';
import s from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux';
import { LoginForm } from './LoginForm';


const Login = () => {

  const state = useAppSelector(state => ({ isAuth: state.authSlice.isAuth }))
  const navigate = useNavigate()

  useEffect(() => {
    if (state.isAuth) navigate(`/profile`)
  }, [])

  return (<div className={s.container}>
    <LoginForm />
  </div>)
}

export default Login;