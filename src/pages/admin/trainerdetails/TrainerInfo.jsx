import React from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Footer from '../../../components/user/footer/Footer'
import TrainerDetails from '../../../components/admin/trainerdetails/TrainerDetails'

function TrainerInfo() {
  return (
    <div>
      <NavbarA/>
      <TrainerDetails/>
      <Footer/>
    </div>
  )
}

export default TrainerInfo