import React, { useEffect, useState } from 'react';
import s from './Header.module.css';
import axios from 'axios';
import { logOut } from '../../redux/authReducer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux';
import { Button } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const MENU = [
  // {children:() => <NavLink to={'/chat'}>Chat</NavLink>, key: 'chat'},
  // {children:() => <NavLink to={'/dialogs'}>Messages</NavLink>, key: 'messages'},
  // {children:() => <NavLink to={'/profile'}>Profile</NavLink>, key: 'profile'},
  // {children:() => <NavLink to={'/users'}>Users</NavLink>, key: 'users'},
  {to:'/chat', label: 'Chat', key: 'chat'},
  {to:'/dialogs', label: 'Messages', key: 'messages'},
  {to:'/profile', label: 'Profile', key: 'profile'},
  {to:'/users', label: 'Users', key: 'users'},
]

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
          <div >
            {/* {login} <br />s */}
            
            <Button danger onClick={onLogOutClick}>log out</Button>
          </div> :
          // <NavLink to='/login'>log in</NavLink >
          <Button type='primary' href='/login'>log in</Button>
        }
      </div>
    </div>
  </header>

  // return(
  //   <Layout.Header
  //       style={{
  //         position: 'sticky',
  //         top: 0,
  //         zIndex: 1,
  //         width: '100%',
  //         display: 'flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <div className="demo-logo" />
  //       <Menu
  //         theme="dark"
  //         mode="horizontal"
  //         defaultSelectedKeys={['2']}
  //         items={MENU}
  //         style={{ flex: 1, minWidth: 0 }}
  //       />
  //     </Layout.Header>
  // )
}

export default Header;
