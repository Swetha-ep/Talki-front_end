import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faBook,faSuitcase,faGraduationCap }from '@fortawesome/free-solid-svg-icons'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import adminAxios from '../../../axios/adminAxios';
import { useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function ProfileT() {
  const token = localStorage.getItem('trainer');
  const decoded = jwtDecode(token)
  console.log(decoded.id);
  // const navigate = useNavigate();
  const [profile, setProfile] = useState('');

  useEffect(() => {
 
    adminAxios.get
    (`user-application/${decoded.id}`)
    .then((response) => {
      setProfile(response.data);
      console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching application details:', error);
      });
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-center md:mx-32 mt-5">
      <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-full p-5 px-10 text-center mt-10 justify-center ">
      <FontAwesomeIcon className='ml-auto' icon={faTimes} />
          <img
            src={profile.user?.profile_picture}
            alt="Your Image"
            className="mx-auto mb-4 h-16 w-16 rounded-full mt-10"
            
          />
          <p className='font-bold '>
           {profile.name}
          </p>
          <p>
          {profile.country}
          </p>
          <p className='mt-10 font-light '>
          {profile.about_me}
          </p>
          <h1 className='font-bold mt-10  text-left'><FontAwesomeIcon className='mr-1' icon={faBook} /> 
             Teaching style:
          </h1>
          <p className='mt-5 text-left'>
          {profile.teaching_style}
          </p>
          <h1 className='font-bold mt-10 text-left'><FontAwesomeIcon className='mr-1' icon={faSuitcase} /> 
           Work Experience:
          </h1>
          
          <p className='mt-2 text-left'>
          {profile.work_experience}
          </p>
          <h1 className='font-bold mt-10 text-left'><FontAwesomeIcon className='mr-1' icon={faGraduationCap} /> 
          Education:
          </h1>
          
          <p className='mt-2 text-left'>
          {profile.education}
          </p>
          
          {/* Content for the first section */}
        </div>
    </div>
  )
}

export default ProfileT
