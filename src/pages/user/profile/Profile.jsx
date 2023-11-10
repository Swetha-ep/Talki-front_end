import React, { useEffect } from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import ProfileU from '../../../components/user/profile/ProfileU'
import Footer from '../../../components/user/footer/Footer'
function Profile() {
  useEffect(() => {
    
    document.title = "Profile | Talki";
  }, []);
  return (
    <div>
      <Navbar/>
      <ProfileU/>
      <Footer/>
    </div>
  )
}

export default Profile
