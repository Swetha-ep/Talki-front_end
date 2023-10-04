import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import userAxios from '../../../axios/userAxios';
import jwtDecode from 'jwt-decode';
//import jwt from 'jsonwebtoken'


function ProfileU() {
  const LEVEL_CHOICES = [
    ('beginner', 'Beginner'),
    ('intermediate', 'Intermediate'),
    ('advanced', 'Advanced'),
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    user_level: 'beginner', 
  }); 

  const handleSave = () => {
    userAxios
    .put(`/user-profile/${decoded.user_id}/`, userData)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error editing user profile:', error);
      });
    setIsEdit(!isEdit);
  };

  const token = localStorage.getItem('user')
  console.log(token,"setha2");
  const decoded = jwtDecode(token)
  
  console.log(decoded.user_id,"swetha");

  useEffect(() => {
    
    userAxios
      .get(`/user-profile/${decoded.user_id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []); 

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <FontAwesomeIcon className="ml-auto " icon={faTimes} />
         
          <div className="flex flex-col items-center">
            <div className="sm:block  w-1/2 ">
              <img
                className="rounded-full mt-20"
                src={userData.profile_picture ? userData.profile_picture : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              }
                
                alt=""
                srcset=""
              />
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
                    Full name
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
                        {LEVEL_CHOICES.map(([value, label]) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
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
      </section>
    </div>
  );
}

export default ProfileU;
