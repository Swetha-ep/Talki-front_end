import React from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import TutorListing from '../../../components/user/tutor/TutorListing'

function TutorListingPage() {
  return (
    <div>
      <Navbar/>
      <TutorListing/>
      <Footer/>
    </div>
  )
}

export default TutorListingPage
