import React, { useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import Dialogs from './pages/Dialogs/Dialogs';
import Users from './pages/Users/Users';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Preloader from './components/Preloader/Preloader';
import Error from './components/Error';
import Login from './pages/Login/Login';
import { initializeApp } from './redux/appReducer';
import store, { useAppDispatch, useAppSelector } from './redux'
import { Provider } from 'react-redux';
import Chat from './pages/Chat/Chat';

const News = lazy(() => import('./pages/News/News'))
const Music = lazy(() => import('./pages/Music/Music'))
const Settings = lazy(() => import('./pages/Settings/Settings'))


const App = () => {

  const state = useAppSelector(state => state.appSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!state.initialized) return <Preloader />

  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <div className='app-content-navbar'>
          <Navbar />
          <div className='app-wrapper-content'>
            <Suspense fallback={'Loading...'}>
              <Routes>
                <Route path='/' element={<Navigate to="/profile" />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile/:userId?' element={<Profile />} />
                <Route path='/dialogs/:userId?' element={<Dialogs />} /> 
                <Route path='/chat' element={<Chat />} />
                <Route path='/users' element={<Users />} />
                {/* <Route path='/news' element={<News />} /> */}
                {/* <Route path='/music' element={<Music />} /> */}
                {/* <Route path='/settings' element={<Settings />} /> */}
                <Route path='/*' element={<Error />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppContainer;