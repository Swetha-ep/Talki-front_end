import React from 'react'
import Navbart from '../../../components/trainer/navbarT/Navbart'
import ProfileT from '../../../components/trainer/profileT/ProfileT'
import Footer from '../../../components/user/footer/Footer'

function Profilet() {
  useEffect(() => {
    
    document.title = "Profile | Talki";
  }, []);
  return (
    <div>
      <Navbart/>
      <ProfileT/>
      <Footer/>
    </div>
  )
}

export default Profilet
