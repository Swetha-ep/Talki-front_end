import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Userlist from '../pages/admin/user_list/Userlist'
import Trainerlist from '../pages/admin/trainer_list/Trainerlist'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ApplicationPage from '../pages/admin/applications/ApplicationPage'
import ApplicaionList from '../pages/admin/applications/ApplicaionList'

function AdminRoute() {
  const isAdmin =  localStorage.getItem('admin')
  console.log("token",isAdmin);
  useEffect(()=>{

  },[])
  return (
    <div>
      
      <Routes>
        <Route exact path='/' element={isAdmin ? <Dashboard/> : <Login user={'admin'}/>}/>
        <Route exact path='/login' element={!isAdmin ?  <Login user={'admin'}/> : <Dashboard/>}/>
        <Route exact path='/user-list' element={isAdmin? <Userlist/> : <Login user={'admin'}/>}/>
        <Route exact path='/trainer-list' element={ isAdmin? <Trainerlist/> : <Login user={'admin'}/>}/>
        <Route exact path='/application-list' element={isAdmin? <ApplicaionList/> : <Login user={'admin'}/>}/> 
        <Route exact path='/application/:id' element={isAdmin? <ApplicationPage/> : <Login user={'admin'}/>}/> 
      </Routes>   
      
      
    </div>
  )
}

export default AdminRoute
