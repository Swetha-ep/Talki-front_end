import React, { useEffect } from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import TutorProfile from '../../../components/user/tutor/TutorProfile'

function TutorProfilePage() {
  useEffect(() => {
    
    document.title = "Trainer profile | Talki";
  }, []);
  return (
    <div>
      <Navbar/>
      <TutorProfile/>
      <Footer />
    </div>
  )
}

export default TutorProfilePage
