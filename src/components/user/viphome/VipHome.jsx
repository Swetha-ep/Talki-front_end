import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useEffect ,useState} from 'react'
import userAxios from '../../../axios/userAxios'

function VipHome() {
  const [profile, setProfile] = useState('');
  const token = localStorage.getItem('user')
  const decoded = jwtDecode(token)
  const navigate = useNavigate();

  useEffect(()=>{
    userAxios
      .get(`user-vip/${decoded.user_id}`)
      .then((response) => {
        setProfile(response.data);
        
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  },[])

  
  return !profile.is_vip ?(
    
    <div className="flex flex-col md:flex-row justify-center space-y-7 md:space-x-7 mx-4 md:mx-32 mt-5 ">
      {/* <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center mt-5"> */}
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-4xl p-7 text-center mt-10 ">
        
   
          <h1 className='font-bold'><FontAwesomeIcon icon={faStar} size="2x" style={{ color: 'gold' }} />  VIP Membership: Elevate Your Learning Experience</h1>
          <p className='pt-10'>
          Are you ready to take your learning journey to the next level? With our VIP membership, you gain exclusive access to high-skilled and experienced trainers who are here to empower your growth. Experience personalized guidance, extended video chat sessions, and valuable suggestions that will accelerate your progress.
          </p>
          
          {/* Content for the first section */}
            <div className="mt-10 flex justify-end">
            <button
                type="button"
                className="py-2 px-4 text-white  rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl"
                onClick={() => navigate("/paymentvip")}
            >
                Check this out!
            </button >
            </div>
        </div>
        
      
    </div> 
  ) : null 
}

export default VipHome
