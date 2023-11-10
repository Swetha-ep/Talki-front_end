import React, { useEffect, useState , useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import userAxios from '../../../axios/userAxios';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';


function ProfileU() {
  
  
  const [isEdit, setIsEdit] = useState(false);
  const [level_choices, setLevelChoices] = useState([]);

  
  const [userData, setUserData] = useState(
    ''
  ); 


  const [selectedFile, setSelectedFile] = useState({
    profile_picture:null,
  });
    console.log("-------------->",selectedFile)

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const image=(event.target.files[0]); 
    setSelectedFile({
      profile_picture:image
    })
    }


    const handleEditClick = () => {
      fileInputRef.current.click();
    };


  const handleSave = () => {
    const formData = new FormData();
    if (selectedFile.profile_picture instanceof File) {
      formData.append('profile_picture', selectedFile.profile_picture);
    } else {
      console.error('Selected file is not a File object:', selectedFile.profile_picture);
      // Ensure this output is a File object, if not, check the file input event handling.
    }
  
    // Append other data to the FormData
    formData.append('email', userData.email);
    formData.append('user_level', userData.user_level);
    formData.append('username', userData.username);
  
    console.log(userData)
    userAxios
    .patch(`/user-profile/${decoded.user_id}/`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
      .then((response) => {
        setUserData(response.data);
        
        toast.success("Profile updated successfully")
        Swal.fire({
          icon: 'success',
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error('Error editing user profile:', error);
        toast.error("Error editing user profile")
      });
    setIsEdit(!isEdit);
  };

  const token = localStorage.getItem('user')
  console.log(token,"setha2");
  const decoded = jwtDecode(token)
  
  console.log(decoded.user_id,"swetha");
  console.log(decoded.password);
  useEffect(() => {
    
    userAxios
      .get(`/user-profile/${decoded.user_id}`)
      .then((response) => {
        setUserData(response.data);
        setLevelChoices(response.level_choices);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
      
  }, []); 

  return (
    <div>
      <ToastContainer/>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <FontAwesomeIcon className="ml-auto " icon={faTimes} />
         
          <div className="flex flex-col items-center">
            <div className="sm:block  w-1/2 ">
  
            
           
              
            <form encType="multipart/form-data">
            <input
              type="file"
              name="place_image"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"

            />
          </form>
            
            
          <img
        className="h-15 w-15 mt-2 rounded-full"
        src={
          // Use selectedFile when editing, userData.profile_picture otherwise
          isEdit && selectedFile.profile_picture
            ? URL.createObjectURL(selectedFile.profile_picture)
            : userData.profile_picture
            ? userData.profile_picture
            : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
        alt=""
        onClick={handleEditClick}
      />
            
            {/* ) : ( */}
              {/* <img
                className="h-15 w-15 mt-2 rounded-full"
                src={userData.profile_picture ? userData.profile_picture : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                alt=""
              />   )} */}
            </div>
           
            {/* <button
              type="submit"
              className="mt-12 p-2 m-2 text-white  rounded-3xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl w-40"
            >
              {" "}
              Go to Suggestions
            </button> */}
            <button
              type="submit"
              className="p-2  text-white  rounded-3xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl w-40"
              onClick={handleSave}
            >
              {isEdit ? 'Save' : 'Edit profile'}
            </button>
          </div>
          {/* form */}
          <div className="sm:w-1/2 px-0 md:mx-32">
            <div className="px-4 sm:px-0">
              <h3 className=" font-semibold leading-7 text-gray-900 text-center">
                PROFILE
              </h3>
              <p className="mt-1 max-w-2xl  leading-6 text-gray-500"></p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">
                    Username
                  </dt>
                  {isEdit ? (
                    <input
                      type="text"
                      className='w-64 p-1  rounded-lg'
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          username: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left ">
                      {userData.username}
                    </dd>
                  )}
                </div>
                
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">
                    Email
                  </dt>
                  {isEdit ? (
                    <input
                      type="text"
                      className='w-64 p-1 rounded-lg'
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                  <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
                    {userData.email}
                  </dd>
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">
                    Level
                  </dt>
                  {isEdit ? (
                    <div>
                      <select
                        className='w-64 p-1 rounded-lg'
                        value={userData.user_level}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            user_level: e.target.value,
                          })
                        }
                      >
                        {userData.level_choices ? (
                        userData.level_choices.map((choice, index) => (
                          <option key={index}>
                            {choice.label}
                           
                            
                          </option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}   
                      </select>
                    </div>
                  ) : (
                    <div>
                      <p>{userData.user_level}</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className=" font-medium leading-6 text-gray-900 text-left ml-0">
                   Type
                  </dt>
                  
                    <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                      {userData.is_vip ? 'VIP User' : 'Non-VIP User'}
                    </dd>
                 
                </div>
              </dl>
            </div>
          </div>
          
        </div>
      {/* </div>   */}
        
      </section>
      
    </div>
  );
}

export default ProfileU;