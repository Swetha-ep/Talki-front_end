import React , {useState, useEffect}from 'react'
import tutorImg from '../../../assets/tr.jpg'
import { useNavigate } from 'react-router-dom'
import adminAxios from "../../../axios/adminAxios"


function TutorListing() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
   
    useEffect(() => {
    
      const fetchTrainers = async () => {
        try {
          const response = await adminAxios.get("trainers/"); 
          console.log(response.data)
          setUsers(response.data);
          
          setLoading(false);
        } catch (error) {
          setError("Error fetching trainers.");
          setLoading(false);
        }
      };
  
      fetchTrainers();
    }, []);
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 lg:mx-5 mx-1'>
      {users.map((tutor)=>{
        console.log(tutor.id)
        return(<>
        <div className='col-span-1 shadow-lg gap-2 p-4 m-3 rounded-2xl'>
            {tutor.is_Tvip ? <div className='bg-yellow-500 p-1 h-8 w-8 rounded-md text-center font-semibold text-base text-white' >
                VIP
            </div> : <div className='bg-white p-1 h-8 w-8 rounded-md text-center font-semibold text-base text-white'> </div>}
            <div className='flex flex-col items-center '>
        <img src={tutorImg} className='rounded-full shadow-xl h-28 w-28' alt="" srcset="" />
            </div>
            <h1 className='text-center font-medium text-base pt-5 '>{tutor.username}</h1>
            {/* <h2 className='text-center font-light text-base pt-5 '>{tutor.country}</h2> */}

        <div className='gap-2  flex justify-center'>
            <button className='lg:p-2 p-1 lg:px-6 px-2 lg:text-base text-xs rounded-3xl text-white shadow-2xl m-1 lg:m-2 bg-[#8E8C8C]' onClick={()=>navigate(`/tutors-profile/${tutor.id}`)}>
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
