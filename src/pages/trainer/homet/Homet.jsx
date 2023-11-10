import React, { useEffect } from 'react'
import Navbart from '../../../components/trainer/navbarT/Navbart'
import trainerHImage from '../../../assets/trainerhome.jpg'
import Cards from '../../../components/user/section2/Cards'
import Footer from '../../../components/user/footer/Footer'

function Homet() {
  useEffect(() => {
    
    document.title = "Home | Talki";
  }, []);
  return (
    <div>
      <Navbart />
      <div >
        <img className="bg-cover bg-center h-auto w-full " src={trainerHImage} alt="" srcset="" />
        <Cards />
      </div>
      <Footer />
    </div>
  )
}

export default Homet
