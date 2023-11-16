import React from 'react';
import { useSelector } from 'react-redux';

const Login = () => {

  let state = useSelector(state => state.authSlice)

  return (<div>
    log in
  </div>)
}

export default Login