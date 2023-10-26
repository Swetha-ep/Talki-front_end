import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Signup from '../components/common/register/Signup'
import Home from '../pages/common/home/Home'
import Profile from '../pages/user/profile/Profile'
import ApplicationFormPage from '../pages/user/application/ApplicationFormPage'
import InfroPage from '../pages/user/info/InfroPage'
import TutorListingPage from '../pages/user/tutors/TutorListingPage'
import TutorProfilePage from '../pages/user/tutors/TutorProfilePage'
import Paymentvip from '../pages/user/payment/Paymentvip'
import ChatComponent from '../components/common/chat/ChatComponent'



function UserRoute() {
  const isUser =  localStorage.getItem('user')
  console.log("token",isUser);
  return (
    <div> 
      <Routes>
        <Route exact path='/' element={isUser ? <Home /> :<Login user={'user'}/>}/>
        <Route exact path='/login' element={!isUser && <Login user={'user'}/>}/>
        <Route exact path='/register' element={!isUser &&  <Signup/> }/>
        <Route exact path='/profile' element={isUser ? <Profile /> : <Login user={'user'}/>}/>
        <Route exact path='/tutors' element={ isUser ? <TutorListingPage /> :<Login user={'user'}/>}/>
        <Route exact path='/tutors-profile/:id' element={isUser ? <TutorProfilePage /> : <Login user={'user'}/>}/>
        <Route exact path='/application-form' element={isUser ? <ApplicationFormPage /> :<Login user={'user'}/>}/>
        <Route exact path='/application-info' element={isUser  ? <InfroPage /> : <Login user={'user'}/>}/>
        <Route exact path='/paymentvip' element={isUser  ? <Paymentvip /> : <Login user={'user'}/>}/>
        <Route exact path='/chat/:channelName/:trainer' element={isUser  ? <ChatComponent /> : <Login user={'user'}/>}/>

      </Routes>
    </div>
  )
}

export default UserRoute
