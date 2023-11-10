import React from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Trainertable from '../../../components/admin/trainertable/Trainertable'


function Trainerlist() {
  useEffect(() => {
    
    document.title = "Trainerlist | Talki";
  }, []);
  return (
    <div>
      <NavbarA/>
      <Trainertable/>
    </div>
  )
}

export default Trainerlist
