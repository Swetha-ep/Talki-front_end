import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faBook,faSuitcase,faGraduationCap }from '@fortawesome/free-solid-svg-icons'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import adminAxios from '../../../axios/adminAxios';
import { useParams, useNavigate } from 'react-router-dom';

function TrainerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');

  useEffect(() => {
 
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
    <div className="flex flex-col md:flex-row justify-center md:mx-32 mt-5">
      <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-full p-5 px-10 text-center mt-10 justify-center ">
      <FontAwesomeIcon className='ml-auto' icon={faTimes} onClick={() => navigate("/admin/trainer-list")}/>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Your Image"
            className="mx-auto mb-4 h-16 w-16 rounded-full mt-10"
            // style={{ width: '100px', height: '100px' }}
          />
          <p className='font-bold '>
            {profile.name}
          </p>
          <p>
            Japan
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
          <p className='mt-5 text-left font-semibold'>
          
          </p>
          <p className='mt-2 text-left'>
          {profile.work_experience}
          </p>
          <h1 className='font-bold mt-10 text-left'><FontAwesomeIcon className='mr-1' icon={faGraduationCap} /> 
          Education:
          </h1>
          <p className='mt-6 text-left font-semibold'>
          
          </p>
          <p className='mt-2 text-left'>
          {profile.education}
          </p>
          
          {/* Content for the first section */}
        </div>
    </div>
  )
}

export default TrainerDetails
