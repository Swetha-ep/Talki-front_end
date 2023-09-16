import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Signup from '../components/common/register/Signup'
import Home from '../pages/common/home/Home'
import Profile from '../pages/user/profile/Profile'



function UserRoute() {
  return (
    <div> 
      <Routes>
        <Route exact path='/'/>
        <Route exact path='/login' element={<Login user={'user'}/>}/>
        <Route exact path='/register' element={<Signup/>}/>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/profile' element={<Profile />}/>

      </Routes>
    </div>
  )
}

export default UserRoute
