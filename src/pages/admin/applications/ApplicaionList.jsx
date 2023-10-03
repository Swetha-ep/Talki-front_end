import React from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Footer from '../../../components/user/footer/Footer'
import ApplicationTable from '../../../components/admin/application/ApplicationTable'

function ApplicaionList() {
  return (
    <div>
            <NavbarA/>
            <div className='m-5 lg:mx-10'>
            <ApplicationTable/>

            </div>
            <Footer/>


    </div>
  )
}

export default ApplicaionList