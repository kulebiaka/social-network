import React, { useEffect } from 'react';
import s from './Header.module.css';
import axios from 'axios';
import { logOut, setAuthUserData, setUserIfLoggedIn } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { authAPI } from '../../API/api';

const Header = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.authSlice)
  const navigate = useNavigate()

  const onLogOutClick = () => {
    dispatch(logOut())
      .then(() => {navigate('/login')})  
  }

  // useEffect(() => {
  //   dispatch(setUserIfLoggedIn())
  // }, []) 

  return <header className={s.header}>
    <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
    <div>
      {state.isAuth ?
        <div>
          {state.login} <br />
          <button onClick={onLogOutClick}>log out</button>
        </div> :
        <NavLink to='/login'>log in</NavLink >
      }
    </div>
  </header>
}

export default Header;