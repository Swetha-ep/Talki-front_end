import React, { useState, useEffect } from "react";
import adminAxios from "../../../axios/adminAxios";
import { toast } from "react-toastify";


function Trainertable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchTrainers = async () => {
      try {
        const response = await adminAxios.get("trainers/"); 
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching trainers.");
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const toggleBlock = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, isBlocked: !user.isBlocked };
        }
        return user;
      })
    );
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
              ID
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
        <button className="bg-gray-500 text-white px-2 py-1 rounded">
          Details
        </button>
      </td>
      <td className=" px-4 py-2">
        {user.isBlocked ? (
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => toggleBlock(user.id)}
          >
            Unblock
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => toggleBlock(user.id)}
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
    // <div className="flex justify-center items-center h-screen md:h-auto  ">

    // </div>
  );
}

export default Trainertable;
