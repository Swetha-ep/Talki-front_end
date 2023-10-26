import React from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import bghomeImage from '../../../assets/bghome4.jpg'
import Cards from '../../../components/user/section2/Cards'
import VipHome from '../../../components/user/viphome/VipHome'
import TrainerH from '../../../components/user/trainerhome/TrainerH'
import Footer from '../../../components/user/footer/Footer'
import jwtDecode from 'jwt-decode';

function home() {
  const token = localStorage.getItem('user')
  const decoded = jwtDecode(token)
  
  return (
    <div>
      <Navbar />
      <div >
        <img className="bg-cover bg-center h-auto w-full " src={bghomeImage} alt="" srcset="" />
        <Cards/>
      </div>
      {!decoded.is_vip ?
        <VipHome /> : ''}
        <TrainerH />
        <Footer />
    </div>
  )
}

export default home
