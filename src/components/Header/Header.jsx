import React, { useEffect } from 'react';
import s from './Header.module.css';
import axios from 'axios';
import { setAuthUserData } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {

    let dispatch = useDispatch()
    let state = useSelector(state => state.authSlice)

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true })
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setAuthUserData(response.data.data))
                }
            })
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