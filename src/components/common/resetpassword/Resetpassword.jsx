import React, {useEffect, useRef, useState} from 'react'
import resetImage from '../../../assets/register.jpg'
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import userAxios from '../../../axios/userAxios'

function Resetpassword() {
  const [user_id, setUserId] = useState()
 
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('user_id');
    if (userId) {
      // Use userId in your logic, for example, make an API call with this userId
      console.log('User ID:', userId);
      
    }
    setUserId(userId)
  }, [location.search]);

  

  useEffect(() => {
    
    
    document.title = "SignUp | Talki";
  }, []);
  
  const [formData, setFormData] = useState({
    
    password: "",
    user_id : user_id
  });
  const [other, setother] = useState({password1:''})
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false)
  const [showPassword1,setShowPassword1] = useState(false)
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  
  const [levelChoices, setLevelChoices] = useState([]);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});  
  }
  

    
    const validateForm = () => {
      
       if (formData.password.trim() === "") {
        toast.error("Password should not be empty");
        return false;
      } else if (formData.password.trim().length < 6) {
        toast.warn("Password should be at least 6 characters");
        return false;
      } else if (formData.password1 === "") {
        toast.error("Confirm Password should not be empty");
        return false;
      } else if (formData.password !== other.password1) {
        toast.error("Password didn't match");
        return false;
      }
      return true;
    };
  
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (validateForm()) {
        setLoading(true);
        try {
          const response = await userAxios.post(
            `reset-password/${user_id}`,
            formData
          );
          toast.success(response.data.message);
          setFormData({password : ""})
          setother({password1 : ""})
          localStorage.removeItem('user')
          navigate('/login')
          toast.success(response.data.message)
          
          // navigate('/login');
          // navigate('/register-resendmail')
        } catch (error) {
          console.log(error,"errroeeeee");
          if (error.response.data && error.response.data.message) {
            // Extract and display the error message
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
          } else {
            // If 'message' property doesn't exist, handle the error gracefully
            toast.error('An error occurred.');
          }
        } finally {
          setLoading(false);
        }
      }
    };
   

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        {/* image */}

        <div className="sm:block hidden w-1/2">
          <img className="rounded-2xl mt-12" src={resetImage} alt="" srcset="" />
        </div>

        {/* form*/}
        <div className="sm:w-1/2 px-16 ">
        <h1 className="font-extrabold text-2xl text-shadow text-center">
            TALKI <FontAwesomeIcon icon={faComment} />
          </h1>
          <br />
          <h1 className="font-bold text-xl text-center text-shadow ">
            Reset password
          </h1>
          <form
            action="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            
            
            
            <div className="relative mt-10">
              <input
                type={showPassword ? "text" : "password"}
                className="p-2 rounded-xl border w-full"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                autoComplete="new-password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill absolute top-1/3 right-3 hover:cursor-pointer"
                viewBox="0 0 16 16"
                onClick={()=>setShowPassword(showPassword ? false : true)}
              >
                <path d={
                    showPassword
                      ? "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                      : "m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                  }/>
                <path  d={
                    showPassword
                      ? "M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      : "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                  }
                />
              </svg>
              
            </div>

            <div className="relative">
            <input
                type={showPassword1 ? "text" : "password"}
                className="p-2 rounded-xl border w-full"
                name="password"
                value={other.password1}
                onChange={(e) => {
                  setother({ ...other, password1: e.target.value });
                }}
                placeholder="confirm password"
                autoComplete="new-password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill absolute top-1/3 right-3 hover:cursor-pointer"
                viewBox="0 0 16 16"
                onClick={()=>setShowPassword1(showPassword1 ? false : true)}
              >
                <path d={
                    showPassword1
                      ? "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                      : "m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                  }/>
                <path  d={
                    showPassword1
                      ? "M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      : "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                  }
                />
              </svg>
              
            </div>
            
            
            
            <button
              type="submit"
              className="py-2 text-white font-bold rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl "
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
    </div>
  
  );
            }
            
            

                  
export default Resetpassword
