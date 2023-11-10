import React, { useEffect } from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import VipPay from '../../../components/user/viphome/VipPay'

function Paymentvip() {
  useEffect(() => {
    
    document.title = "Payment | Talki";
  }, []);
  return (
    <div>
      <Navbar />
      <VipPay/>
      <Footer />
    </div>
  )
}

export default Paymentvip
