import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
// import Friends from './Friends/Friends'

const links = [
  { to: '/profile', title: 'Profile' },
  { to: '/dialogs', title: 'Messages' },
  { to: '/users', title: 'Users' },
  { to: '/news', title: 'News' },
  { to: '/settings', title: 'Settings' },
]


const Navbar = () => {

  let userId = useAppSelector(state => state.authSlice.id)

  return (
    <nav className={s.nav}>
      {links.map((l) =>
      (<div className={s.item}>
        <NavLink to={l.to}>{l.title}</NavLink>
      </div>))}
      {/* <Friends state={props.state.friendsList}/> */}
    </nav>
  )
}

export default Navbar;