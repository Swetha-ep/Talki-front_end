import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Signup from '../components/common/register/Signup'
import Home from '../pages/common/home/Home'

function UserRoute() {
  return (
    <div> 
      <Routes>
        <Route exact path='/'/>
        <Route exact path='/login' element={<Login user={'user'}/>}/>
        <Route exact path='/register' element={<Signup/>}/>
        <Route exact path='/home' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default UserRoute
