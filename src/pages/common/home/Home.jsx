import React from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import bghomeImage from '../../../assets/bghome4.jpg'
import Cards from '../../../components/user/section2/Cards'
import VipHome from '../../../components/user/viphome/VipHome'
import TrainerH from '../../../components/user/trainerhome/TrainerH'
import Footer from '../../../components/user/footer/Footer'
function home() {
  return (
    <div>
      <Navbar />
      <div >
        <img className="bg-cover bg-center h-auto w-full " src={bghomeImage} alt="" srcset="" />
        <Cards/>
      </div>
        <VipHome />
        <TrainerH />
        <Footer />
    </div>
  )
}

export default home
