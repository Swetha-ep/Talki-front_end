import React from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import bghomeImage from '../../../assets/bghome3.jpg'
function home() {
  return (
    <div>
      <Navbar />
      <div >
        <img className="bg-cover bg-center h-auto w-full " src={bghomeImage} alt="" srcset="" />
        {/* Your content for the 1/4 height section */}
      </div>

    </div>
  )
}

export default home
