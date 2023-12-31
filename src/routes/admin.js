import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Userlist from '../pages/admin/user_list/Userlist'
import Trainerlist from '../pages/admin/trainer_list/Trainerlist'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ApplicationPage from '../pages/admin/applications/ApplicationPage'
import ApplicaionList from '../pages/admin/applications/ApplicaionList'

import TrainerInfo from '../pages/admin/trainerdetails/TrainerInfo'
import Error404Page from '../components/common/error/Error404'

function AdminRoute() {
  const isUser = localStorage.getItem('user');
  const isAdmin =  localStorage.getItem('admin')
  console.log("token",isAdmin);
  
  if (isUser) {
    return <Navigate to="/login" />;
  } 
    
    return (
      <div>
        
        <Routes>
          <Route exact path='/' element={isAdmin ? <Dashboard/> : <Login user={'admin'}/>}/>
          <Route exact path='/login' element={!isAdmin ?  <Login user={'admin'}/> : <Dashboard/>}/>
          <Route exact path='/user-list' element={isAdmin? <Userlist/> : <Login user={'admin'}/>}/>
          <Route exact path='/trainer-list' element={ isAdmin? <Trainerlist/> : <Login user={'admin'}/>}/>
          <Route exact path='/application-list' element={isAdmin? <ApplicaionList/> : <Login user={'admin'}/>}/> 
          <Route exact path='/application/:id' element={isAdmin? <ApplicationPage/> : <Login user={'admin'}/>}/>
          <Route exact path='/trainer-details/:id' element={isAdmin? <TrainerInfo/> : <Login user={'admin'}/>}/> 
          <Route exact path='/*' element={<Error404Page role={"/admin"}/>}/>

        </Routes>   
        
        
      </div>
    )
}

export default AdminRoute
