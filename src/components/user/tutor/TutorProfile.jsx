import React, {useState,useEffect} from 'react'
import tutorImage from '../../../assets/tr.jpg'
import { useParams, useNavigate } from 'react-router-dom'
import adminAxios from '../../../axios/adminAxios'

function TutorProfile() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [profile, setProfile] = useState('');

  useEffect(() => {
    console.log("hiiiiiiiiiiiii")
    adminAxios.get
    (`user-application/${id}`)
    .then((response) => {
      setProfile(response.data);
      console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching application details:', error);
      });
  }, [id]);

  return (
    <div className='m-10 lg:mx-24'>

    <div className='p-10 lg:p-16 gap-10 shadow-2xl rounded-2xl '>
    <div className="flex justify-end " onClick={()=>navigate('/tutors')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-x-circle-fill w-8 h-8"
            viewBox="0 0 25 25"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>
        <div className='flex flex-col items-center '>
            <img className='rounded-full shadow-xl h-28 w-28' src={tutorImage} alt="" srcset="" />
            <h1 className='pt-15'>{profile.name}</h1>
        </div>
        <h1 className='font-thin  italic pt-4'>{profile.about_me}</h1>
        <div className='gap-2'>
        <div className='flex mt-6'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-video3 m-1 mr-3" viewBox="0 0 16 16">
        <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z"/>
        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z"/>
        </svg>
            <h1 >Teaching style :</h1>
        </div>
        <div>
            <h1 className='mt-3 lg:mt-6'>{profile.teaching_style}</h1>
        </div>
            </div>   


             <div className='gap-2'>
        <div className='flex mt-6'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase-fill m-1 mr-3" viewBox="0 0 16 16">
  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"/>
</svg>
            <h1 >Work Experience :</h1>
        </div>
        <div className='mt-3'>
            {/* <h1>Business Development Manager IT</h1> */}
            <h1 >
            {profile.work_experience}</h1>
        </div>
            </div>    


                   <div className='gap-2'>
        <div className='flex mt-6'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book m-1 mr-3" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
            <h1 >Education :</h1>
        </div>
        <div className='mt-3 lg:mt-6'>
            {/* <h1 className='lg:mt-2'>College : Sports and Athletics</h1> */}
            <h1 className='lg:mt-2'>
            {profile.education}</h1>
        </div>

        
            </div>   
    </div>
    </div>
  )
}

export default TutorProfile
