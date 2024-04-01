import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { BarsOutlined, IdcardOutlined, TeamOutlined, MessageOutlined } from '@ant-design/icons'
const links = [
  { to: '/profile', label: 'Profile', children: <IdcardOutlined /> },
  { to: '/dialogs', label: 'Messages', children: <BarsOutlined /> },
  { to: '/chat', label: 'Group', children: <MessageOutlined /> },
  { to: '/users', label: 'Users', children: <TeamOutlined /> },
  // { to: '/news', label: 'News' },
  // { to: '/settings', label: 'Settings' },
]


const Navbar = () => {
  return (
    <nav className={s.nav}>
      {links.map((l) =>
        // (<div className={s.item}>
        <NavLink className={s.item} to={l.to}>
          <span className={s.icon}>{l.children}</span>
          <span>{l.label}</span>
        </NavLink>
        // </div>)
      )}
    </nav>
  )
}

export default Navbar;