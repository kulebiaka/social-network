import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Users from './components/Users/Users';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from './components/common/Preloader';
import Error from './components/common/Error';
import Login from './components/Login/Login';
// import { initializeApp } from './redux/appReducer';
// import ProfileWithRouter from './components/Profile/ProfileWithRouter';

const App = (props: any) => {

  // let state = useSelector((state: any) => state.appSlice)
  // let dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(initializeApp())
  // }, [])

  // if(!state.initialized) return <Preloader />

  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div  className='app-wrapper-content'>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile/:userId?' element={<Profile />} />
            <Route path='/dialogs/*' element={<Dialogs />} />
            <Route path='/users' element={<Users />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/*' element={<Error />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;