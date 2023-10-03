import React from 'react'
import tutorImg from '../../../assets/tr.jpg'
import { useNavigate } from 'react-router-dom'
function TutorListing() {
    const navigate = useNavigate()
    const Tutors = [{name: "Arshad" , vip: true , },
    {name: "Swetha" , vip: true , },
    {name: "Faru" , vip: false , },
    {name: "Fathima" , vip: true ,  }]
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 lg:mx-5 mx-1'>
      {Tutors.map((tutor)=>{
        return(<>
        <div className='col-span-1 shadow-lg gap-2 p-4 m-3 rounded-2xl'>
            {tutor.vip ? <div className='bg-yellow-500 p-1 h-8 w-8 rounded-md text-center font-semibold text-base text-white' >
                VIP
            </div> : <div className='bg-white p-1 h-8 w-8 rounded-md text-center font-semibold text-base text-white'> </div>}
            <div className='flex flex-col items-center '>
        <img src={tutorImg} className='rounded-full shadow-xl h-28 w-28' alt="" srcset="" />
            </div>
            <h1 className='text-center font-medium text-base pt-5 '>{tutor.name}</h1>
        <div className='gap-2  flex justify-center'>
            <button className='lg:p-2 p-1 lg:px-6 px-2 lg:text-base text-xs rounded-3xl text-white shadow-2xl m-1 lg:m-2 bg-[#8E8C8C]' onClick={()=>navigate('/tutors-profile')}>
            PROFILE
            </button>
            <button className='lg:p-2 p-1 lg:px-6 px-2 lg:text-base text-xs rounded-3xl  shadow-2xl m-1 lg:m-2 bg-[#e7e7e7]'>
            CONNECT
            </button>
        </div>
        </div>
        </>
      )
      })}
    </div>
  )
}

export default TutorListing
