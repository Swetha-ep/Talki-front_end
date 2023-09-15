import React, { useState } from 'react';

function Usertable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', level: 'Beginner', isBlocked: false },
    { id: 2, name: 'User 2', level: 'Intermediate', isBlocked: true },
    // Add more data as needed
  ]);

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

  return (
    // <div className="flex justify-center items-center h-screen md:h-auto  ">
    <div className="overflow-x-auto overflow-y-hidden md:mx-40 ">
      <table className="min-w-full md:w-2/3  ">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.level}</td>
              <td className="border px-4 py-2">
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
    // </div>
  );
}

export default Usertable;

