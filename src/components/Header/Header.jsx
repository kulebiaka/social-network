import React, { useEffect } from 'react';
import s from './Header.module.css';
import axios from 'axios';
import { setAuthUserData, setUserIfLoggedIn } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authAPI } from '../../API/api';

const Header = () => {

    let dispatch = useDispatch()
    let state = useSelector(state => state.authSlice)

    useEffect(() => {
        dispatch(setUserIfLoggedIn())
    }, [])

    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        <div>
            { state.isAuth ? 
            state.login :
            <NavLink to='/login'>log in</NavLink >
            }
        </div>
    </header>
}

export default Header;