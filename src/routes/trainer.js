import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Signup from '../components/common/register/Signup'
import Homet from '../pages/trainer/homet/Homet'
import Profilet from '../pages/trainer/profilet/Profilet'
import UserRequests from '../pages/trainer/requests/UserRequests'

function TrainerRoute() {
  return (
    <div>
      <Routes>
        <Route exact path='/'/>
        <Route exact path='/login' element={<Login user={'trainer'} />}/>
        <Route exact path='/register' element={<Signup/>}/>
        <Route exact path='/home' element={<Homet/>}/>
        <Route exact path='/profile' element={<Profilet/>}/>
        <Route exact path='/requests' element={<UserRequests/>}/>

      </Routes>
    </div>
  )
}

export default TrainerRoute
