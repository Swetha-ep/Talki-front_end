import React, { useEffect } from 'react'
import Navbart from '../../../components/trainer/navbarT/Navbart'
import Requestable from '../../../components/trainer/requests/Requestable'
import Footer from '../../../components/user/footer/Footer'
function UserRequests() {
  useEffect(() => {
    
    document.title = "Requests | Talki";
  }, []);
  return (
    <div>
      <Navbart/>
      <Requestable/>
      <Footer/>
    </div>
  )
}

export default UserRequests
