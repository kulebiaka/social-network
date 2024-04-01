import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { BarsOutlined, IdcardOutlined, TeamOutlined, MessageOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../redux';
const links = [
  { to: '/profile', label: 'Profile', children: <IdcardOutlined />, disabled: true },
  { to: '/dialogs', label: 'Messages', children: <BarsOutlined />, disabled: true },
  { to: '/chat', label: 'Group', children: <MessageOutlined />, disabled: true },
  { to: '/users', label: 'Users', children: <TeamOutlined />, disabled: false },
  // { to: '/news', label: 'News' },
  // { to: '/settings', label: 'Settings' },
]


const Navbar = () => {

  const isAuth = useAppSelector(state => state.authSlice.isAuth)

  return (
    <nav className={s.nav}>
      {links.map((l) =>
        // (<div className={s.item}>
        <NavLink aria-disabled={!isAuth && l.disabled} className={s.item} to={l.to}>
          <span className={s.icon}>{l.children}</span>
          <span>{l.label}</span>
        </NavLink>
        // </div>)
      )}
    </nav>
  )
}

export default Navbar;