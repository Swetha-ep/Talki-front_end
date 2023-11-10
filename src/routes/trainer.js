import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/common/login/Login'
import Signup from '../components/common/register/Signup'
import Homet from '../pages/trainer/homet/Homet'
import Profilet from '../pages/trainer/profilet/Profilet'
import UserRequests from '../pages/trainer/requests/UserRequests'
import TrainerChatComponent from '../components/trainer/chat/TrainerChatComponent'
import Error404Page from '../components/common/error/Error404'

function TrainerRoute() {
  const isTrainer = localStorage.getItem('trainer');

  return (
    <div>
      <Routes>
        <Route exact path='/' element={isTrainer ? <Homet/> :<Login user={'user'}/>}/>
        <Route exact path='/profile' element={isTrainer ?<Profilet/> :<Login user={'user'}/>}/>
        <Route exact path='/requests' element={isTrainer ?<UserRequests/>:<Login user={'user'}/>}/>
        <Route exact path='/chat/:channelName/:user' element={isTrainer ?<TrainerChatComponent/>:<Login user={'user'}/>}/>
        <Route exact path='/*' element={<Error404Page role={"/trainer"}/>}/>

      </Routes>
    </div>
  )
}

export default TrainerRoute
