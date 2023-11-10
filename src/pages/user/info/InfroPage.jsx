import React, { useEffect } from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import InfoTable from '../../../components/user/info/InfoTable'

function InfroPage() {
  useEffect(() => {
    
    document.title = "Infopage | Talki";
  }, []);
  return (
    <div>
      <Navbar />
      <InfoTable />
      <Footer />
    </div>
  )
}

export default InfroPage
