import React from 'react';
import s from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Friends from './Friends/Friends'


const Navbar = (props) => {

  let userId = useSelector(state => state.authSlice.id)

  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/profile'>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs'>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users'>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/news'>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/music'>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/settings'>Settings</NavLink>
      </div>

      {/* <Friends state={props.state.friendsList}/> */}
    </nav>
  )
}

export default Navbar;