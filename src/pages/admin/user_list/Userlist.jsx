import React, { useEffect } from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Usertable from '../../../components/admin/usertable/Usertable'

function Userlist() {
  useEffect(() => {
    
    document.title = "Userlist | Talki";
  }, []);
  return (
    <div>
        
      <NavbarA/>
      <Usertable/>
    </div>
  )
}

export default Userlist
