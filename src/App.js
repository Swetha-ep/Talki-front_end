import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRoute from './routes/user'
import TrainerRoute from './routes/trainer'
import AdminRoute from './routes/admin'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path='/admin/*' element={<AdminRoute/>}/>
          <Route  path='/trainer/*' element={<TrainerRoute/>}/>
          <Route  path='/*' element={<UserRoute />}/> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
