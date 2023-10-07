import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../../../axios/adminAxios';
import Swal from 'sweetalert2';
import axios from 'axios';

function ApplicationTable() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    adminAxios
      .get('applicationlist/')
      .then((response) => {
        setApplications(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  const handleApplication = (application, accept) => {
    console.log("RRRRRRRRRRRRRRRRRRRRRRRRRrrrrrrrrrrrrrr");
    const confirmButtonColor = accept ? '#4CAF50' : '#FF5733';

    Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to ${accept ? 'accept' : 'ignore'} this application?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor,
      cancelButtonColor: '#333',
    }).then((result) => {
      console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      if (result.isConfirmed) {
        // Make an Axios POST request to your Django backend
        const endpoint = accept
          ? `http://localhost:8000/dashboard/accept_application/${application.id}/`
          : `http://localhost:8000/dashboard/decline_application/${application.id}/`;

        axios
          .post(endpoint)
          .then((response) => {
            if (response.status === 200) {
              // Optionally display a success message
              if (accept) {
                Swal.fire('Success', 'Application accepted!', 'success');
                setIsAccepted(true);
              } else {
                Swal.fire('Success', 'Application declined!', 'success');
                setIsAccepted(false);
              }

              // Refresh the list of applications after a successful action
              adminAxios
                .get('applicationlist/') // Replace with your API endpoint
                .then((response) => {
                  setApplications(response.data);
                  
                })
                .catch((error) => {
                  console.error('Error fetching applications:', error);
                });
            } else {
              // Handle other responses or errors
              Swal.fire('Error', 'Error processing the application.', 'error');
            }
          })
          .catch((error) => {
            console.log(error);
            console.error('Error processing the application:', error);
            // Handle the error
            Swal.fire('Error', 'Error processing the application.', 'error');
          });
      }
    });
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Render your application data here */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            
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
              
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  onClick={() => navigate(`/admin/application/${application.id}`)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </a>
              </td>
              <td>
              {application.status =='accepted' ? (
            <div>Selected</div>
          ) : (
            <div>
              <button
                  className="bg-green-500 p-1 px-2 rounded-2xl text-white"
                  onClick={() => handleApplication(application, true)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 p-1 px-2 rounded-2xl text-white m-1"
                  onClick={() => handleApplication(application, false)}
                >
                  Ignore
                </button>
            </div>
          )}
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;