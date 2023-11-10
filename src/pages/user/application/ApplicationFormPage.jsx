import React from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import ApplicationForm from '../../../components/user/form/ApplicationForm'
import Footer from '../../../components/user/footer/Footer'

function ApplicationFormPage() {
  useEffect(() => {
    
    document.title = "Applicationform | Talki";
  }, []);
  return (
    <div>
      <Navbar/>
      <ApplicationForm />
      <Footer/>
    </div>
  )
}

export default ApplicationFormPage
