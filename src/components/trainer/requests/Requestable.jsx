import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../../../axios/adminAxios';
import Swal from 'sweetalert2';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import jwtDecode from 'jwt-decode';
import userAxios from '../../../axios/userAxios';

function ApplicationTable() {

  const token = localStorage.getItem('trainer')
  const decoded = jwtDecode(token)
  console.log(decoded.is_online,"sssssssss");
  console.log(decoded.id,"sssssssss");
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState()

  useEffect(() => {
    
    userAxios
      .get(`/user-profile/${decoded.user_id}`)
      .then((response) => {
        setStatus(response.data.is_online)
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
      
  }, []);

  const toggleOnline = () => {
    
    const action = status ? 'Go offline' :  'Go online';
    console.log(action);

    Swal.fire({
        title: `Confirm ${action}`,
        text: `Are you sure you want to ${action} ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          
          const apiUrl = status
          ? `http://127.0.0.1:8000/trainer/trainer-offline/${decoded.id}/`
          : `http://127.0.0.1:8000/trainer/trainer-online/${decoded.id}/`;

          setStatus(status? false: true)
          fetch(apiUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message) {
                Swal.fire({
                  icon: 'success',
                  title: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
                // const token = localStorage.getItem('trainer')
                // fetch('http://127.0.0.1:8000/accounts/token/refresh/', {
                //     method: 'POST',
                //     headers: {
                //       'Content-Type': 'application/json',
                //       'Authorization': 'Bearer ' + token,
                //     },
                //   })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         localStorage.setItem("trainer", data);
                //     })
                //     .catch((error) => {
                //       console.log("error in token refreshing")
                //     });
     
              }
            })
            .catch((error) => {
              console.error(`Error toggling user ${action} status:`, error);
            });
        }
      });
    };
  

//   const handleApplication = (application, accept) => {
//     console.log("RRRRRRRRRRRRRRRRRRRRRRRRRrrrrrrrrrrrrrr");
//     const confirmButtonColor = accept ? '#4CAF50' : '#FF5733';

//     Swal.fire({
//       title: 'Confirm Action',
//       text: `Are you sure you want to ${accept ? 'accept' : 'ignore'} this application?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No',
//       confirmButtonColor,
//       cancelButtonColor: '#333',
//     }).then((result) => {
//       console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
//       if (result.isConfirmed) {
//         // Make an Axios POST request to your Django backend
//         // const endpoint = accept
//         //   ? `http://localhost:8000/dashboard/accept_application/${application.id}/`
//         //   : `http://localhost:8000/dashboard/decline_application/${application.id}/`;

//         axios
//           .post(endpoint)
//           .then((response) => {
//             if (response.status === 200) {
//               // Optionally display a success message
//               if (accept) {
//                 Swal.fire('Success', 'Application accepted!', 'success');
//                 setIsAccepted(true);
//               } else {
//                 Swal.fire('Success', 'Application declined!', 'success');
//                 setIsAccepted(false);
//               }

//               // Refresh the list of applications after a successful action
//               adminAxios
//                 .get('applicationlist/') // Replace with your API endpoint
//                 .then((response) => {
//                   setApplications(response.data);
                  
//                 })
//                 .catch((error) => {
//                   console.error('Error fetching applications:', error);
//                 });
//             } else {
//               // Handle other responses or errors
//               Swal.fire('Error', 'Error processing the application.', 'error');
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//             console.error('Error processing the application:', error);
//             // Handle the error
//             Swal.fire('Error', 'Error processing the application.', 'error');
//           });
//       }
//     });
//   };


//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <PulseLoader size={10} color="#95a7a4" />
//       </div>
//     );
//   }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Render your application data here */}
      <button
    className={`border rounded-lg p-1 px-2 mt-10 text-white mb-10 mr-10 hover:bg-gray-300 float-right ${status ? 'bg-red-600' : 'bg-green-500'}`}
    onClick={() => toggleOnline()}
    >
    {status ? 'Go Offline' : 'Go Online'}
    </button>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            
            <th>Profile</th>
            <th>Name</th>
            <th>Level</th>
            <th>Actions</th>

        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? 'bg-white dark:bg-gray-800'
                  : 'bg-white dark:bg-gray-800'
              } ${
                index === applications.length - 1
                  ? ''
                  : 'border-b dark:border-gray-700'
              } hover:bg-gray-50 dark:hover:bg-gray-600`}
            >
              {/* Render application data here */}
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {application.name}
              </th>
              <td className="px-6 py-4">{application.user.email}</td>
              <td className="px-6 py-4">{application.phone}</td>
              
              
              <td>
              
            <div>
              <button
                  className="bg-green-500 p-1 px-2 rounded-2xl text-white"
                //   onClick={() => handleApplication(application, true)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 p-1 px-2 rounded-2xl text-white m-1"
                //   onClick={() => handleApplication(application, false)}
                >
                  Ignore
                </button>
            </div>
          
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;