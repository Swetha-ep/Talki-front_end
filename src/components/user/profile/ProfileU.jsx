import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes }from '@fortawesome/free-solid-svg-icons'; 
import userAxios from '../../../axios/userAxios'

function ProfileU() {

  
  const [isEdit , setIsEdit] = useState(false)

  const handleSave = () =>{
    setIsEdit(isEdit? false : true)
  }


  useEffect(()=>{
    userAxios.get('/profile')
  },[])
  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5"><FontAwesomeIcon className='ml-auto ' icon={faTimes} />
        {/* image */}
        <div className='flex flex-col items-center'>
        <div className="sm:block  w-1/2 ">
          <img className="rounded-full mt-20" src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" srcset="" />
        </div>
        <button
              type="submit"
              className="mt-12 p-2 m-2 text-white  rounded-3xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl w-40"
            >
              {" "}
              Go to Suggestions
            </button>
            <button
              type="submit"
              className="p-2  text-white  rounded-3xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl w-40" onClick={()=>handleSave()}
            >
              { isEdit ? "save" :
               "Edit profile" }
            </button>
            </div>
        {/* form*/}
        <div className="sm:w-1/2 px-0 md:mx-32 ">
        <div className="px-4 sm:px-0">
        <h3 className=" font-semibold leading-7 text-gray-900 text-center">PROFILE</h3>
        <p className="mt-1 max-w-2xl  leading-6 text-gray-500"></p>
      </div>
        <div className="mt-6 border-t border-gray-100 ">
        <dl className="divide-y divide-gray-100  ">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">Full name</dt>
            
{isEdit ?     <input type="text" value={""} /> :      <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right ">Margot Foster</dd> 
}          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">Country</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">India</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">Level</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">Beginner</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">Phone</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">91-989768543</dd>
          </div>
          </dl>
          </div>
        
        </div>
      </div>
    </section>
    </div>
  )
}

export default ProfileU
