import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Userlist from '../pages/admin/user_list/Userlist'
import Trainerlist from '../pages/admin/trainer_list/Trainerlist'
import Applications from '../pages/admin/applications/Applications'

function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route exact path='/'/>
        <Route exact path='/login' element={<Login user={'admin'}/>}/>
        <Route exact path='/user-list' element={<Userlist/>}/>
        <Route exact path='/trainer-list' element={<Trainerlist/>}/>
        <Route exact path='/applications' element={<Applications/>}/>
        
      </Routes>
    </div>
  )
}

export default AdminRoute
