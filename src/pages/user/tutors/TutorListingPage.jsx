import React, { useEffect } from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import TutorListing from '../../../components/user/tutor/TutorListing'

function TutorListingPage() {
  useEffect(() => {
    
    document.title = "Trainers | Talki";
  }, []);
  return (
    <div>
      <Navbar/>
      <TutorListing/>
      <Footer/>
    </div>
  )
}

export default TutorListingPage
