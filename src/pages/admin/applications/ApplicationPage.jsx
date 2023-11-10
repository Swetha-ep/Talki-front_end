import React, { useEffect } from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Application from '../../../components/admin/application/Application'
import Footer from '../../../components/user/footer/Footer'

function ApplicationPage() {
  useEffect(() => {
    
    document.title = "Application | Talki";
  }, []);
  return (
    <div>
      <NavbarA/>
      <Application/>
      <Footer/>
    </div>
  )
}

export default ApplicationPage
