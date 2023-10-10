import React, { useState, useEffect } from "react";
import adminAxios from "../../../axios/adminAxios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Trainertable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const toggleBlock = (userId, is_active) => {
    const userToToggle = users.find((user) => user.id === userId);
    
    const action = is_active ? 'block' : 'unblock';
  
    Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to ${action} this Trainer?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        
        const apiUrl = is_active
          ? `http://127.0.0.1:8000/dashboard/trainer-block/${userId}/`
          : `http://127.0.0.1:8000/dashboard/trainer-unblock/${userId}/`;
  
        
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
            console.error(`Error toggling trainer ${action} status:`, error);
          });
      }
    });
  };
  const toggleVip = (userId, is_Tvip) => {
    const userToUpdate = users.find((user) => user.id === userId);
  
    const action = is_Tvip ? 'Non-VIP' : 'VIP';
  
    Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to select this trainer as a ${action}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = is_Tvip
          ? `http://127.0.0.1:8000/dashboard/trainer-nonvip/${userId}/`
          : `http://127.0.0.1:8000/dashboard/trainer-vip/${userId}/`;
          
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
  
           
            const updatedUsers = users.map((user) => {
              if (user.id === userId) {
                return { ...user, is_Tvip: !is_Tvip };
              }
              return user;
            });
  
            
            setUsers(updatedUsers);
          })
          .catch((error) => {
            console.error(`Error toggling trainer ${action} status:`, error);
          });
      }
    });
  };
  
        
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    toast.error("Some error occured");
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-2">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Profile
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
            <th scope="col" className="px-6 py-3">
              VIP
            </th>
          </tr>
        </thead>
        <tbody>
  {users.map((user, index) => (
    <tr
      key={user.id}
      className={`${
        index % 2 === 0
          ? "bg-white dark:bg-gray-800"
          : "bg-white dark:bg-gray-800"
      } ${
        index === users.length - 1
          ? ""
          : "border-b dark:border-gray-700"
      } hover:bg-gray-50 dark:hover:bg-gray-600`}
    >
      <td className="px-6 py-4">{user.id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.username}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.email}
      </th>
      <td className=" px-4 py-2">
        <button className="bg-gray-500 text-white px-2 py-1 rounded"
        onClick={() => navigate(`/admin/trainer-details/${user.id}`)}>
          Details
        </button>
      </td>
      <td className=" px-4 py-2">
        {!user.is_active ? (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => toggleBlock(user.id,user.is_active)}
          >
            Unblock
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => toggleBlock(user.id,user.is_active)}
          >
            Block
          </button>
        )}
      </td>
      <td className="px-4 py-2">
      <label>
        <input
          type="checkbox"
          checked={user.is_Tvip} 
          onChange={() => toggleVip(user.id, user.is_Tvip)}
        />
        VIP
      </label>
    </td>  
    </tr>
  ))}
</tbody>
      </table>
    </div>
   
  );
}

export default Trainertable;
