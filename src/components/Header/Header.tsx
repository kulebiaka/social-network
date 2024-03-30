import React, { useEffect, useState } from 'react';
import s from './Header.module.css';
import axios from 'axios';
import { logOut } from '../../redux/authReducer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux';

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
    <div className={s.header_inner}>
      <img src='./assets/some.png' />
      <div>
        {isAuth ?
          <div>
            {login} <br />
            <button onClick={onLogOutClick}>log out</button>
          </div> :
          <NavLink to='/login'>log in</NavLink >
        }
      </div>
    </div>
  </header>
}

export default Header;
