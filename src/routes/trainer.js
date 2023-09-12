import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Signup from '../components/common/register/Signup'

function TrainerRoute() {
  return (
    <div>
      <Routes>
        <Route exact path='/'/>
        <Route exact path='/login' element={<Login user={'trainer'} />}/>
        <Route exact path='/register' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default TrainerRoute
