import React, { useEffect } from 'react'
import Navbart from '../../../components/trainer/navbarT/Navbart'
import trainerHImage from '../../../assets/trainerhome.jpg'
import Cards from '../../../components/user/section2/Cards'
import Footer from '../../../components/user/footer/Footer'
import VipInfo from '../../../components/trainer/Vipinfo/VipInfo'

function Homet() {
  useEffect(() => {
    
    document.title = "Home | Talki";
   
  }, []);

  const token = localStorage.getItem('trainer')
  console.log(token,"setha2");
  const decoded = jwtDecode(token)
  return (
    <div>
      <Navbart />
      <div >
        <img className="bg-cover bg-center h-auto w-full " src={trainerHImage} alt="" srcset="" />
        <Cards />
      </div>
      
      {decoded.is_Tvip ? <div><VipInfo/></div> : ""}
        
      
      <Footer />
    </div>
  )
}

export default Homet
