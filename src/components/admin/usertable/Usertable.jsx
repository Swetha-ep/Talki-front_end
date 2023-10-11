import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { PulseLoader } from 'react-spinners';

function Usertable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch('http://127.0.0.1:8000/dashboard/userslist/')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);


  const toggleBlock = (userId, is_active) => {
    const userToToggle = users.find((user) => user.id === userId);
    
    const action = is_active ? 'block' : 'unblock';
  
    Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to ${action} this user?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        
        const apiUrl = is_active
          ? `http://127.0.0.1:8000/dashboard/user-block/${userId}/`
          : `http://127.0.0.1:8000/dashboard/user-unblock/${userId}/`;
  
        
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
                title: ` ${data.message}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
            
            setUsers((prevUsers) =>
              prevUsers.map((user) => {
                if (user.id === userId) {
                  return { ...user, is_active: !is_active };
                }
                return user;
              })
            );
          })
          .catch((error) => {
            console.error(`Error toggling user ${action} status:`, error);
          });
      }
    });
  };
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <PulseLoader size={10} color="#95a7a4" />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-16">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-2">
              ID
            </th>
            <th scope="col" className="px-6 py-2">
              Name
            </th>
            <th scope="col" className="px-6 py-2">
              Level
            </th>
            <th scope="col" className="px-6 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {!user.is_active ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => toggleBlock(user.id, user.is_active)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => toggleBlock(user.id, user.is_active)}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usertable;
