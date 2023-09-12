import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'

function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route exact path='/'/>
        <Route exact path='/login' element={<Login user={'admin'}/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
