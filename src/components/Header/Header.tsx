import React, { useEffect } from 'react';
import s from './Header.module.css';
import axios from 'axios';
import { logOut } from '../../redux/authReducer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const Header = () => {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => (state.authSlice.isAuth))
  const login = useAppSelector(state => state.authSlice.login)
  const navigate = useNavigate()

  const onLogOutClick = () => {
    dispatch(logOut())
    navigate('/login')
  }

  return <header className={s.header}>
    <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
    <div>
      {isAuth ?
        <div>
          {login} <br />
          <button onClick={onLogOutClick}>log out</button>
        </div> :
        <NavLink to='/login'>log in</NavLink >
      }
    </div>
  </header>
}

export default Header;