import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../../axios/adminAxios";
import Swal from "sweetalert2";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import jwtDecode from "jwt-decode";
import userAxios from "../../../axios/userAxios";
import { ToastContainer, toast } from "react-toastify";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { chatAPI, userAPI } from "../../../constants/api";
import { trainerAPI } from "../../../constants/api";

function ApplicationTable() {
  const token = localStorage.getItem("trainer");
  const decoded = jwtDecode(token);
  console.log(decoded.is_online, "sssssssss");
  console.log(decoded.id, "sssssssss");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [refreshEffect, setRefreshEffect] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  const fetchApplications = () => {
    userAxios
      .get(`senders-for-recipient/${decoded.user_id}/`)
      .then((response) => {
        console.log(response, "requests");
        setApplications(response.data.senders);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  useEffect(() => {
    userAxios
      .get(`/user-profile/${decoded.user_id}`)
      .then((response) => {
        setStatus(response.data.is_online);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });

    fetchApplications();
  }, [refreshEffect]);

  const toggleOnline = () => {
    const action = status ? "Go offline" : "Go online";
    console.log(action);

    Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to ${action} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = status
          ? `${trainerAPI}/trainer-offline/${decoded.id}/`
          : `${trainerAPI}/trainer-online/${decoded.id}/`;

        setStatus(status ? false : true);
        fetch(apiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              Swal.fire({
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setRefreshEffect(!refreshEffect);
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

  const handleIgnore = (userId) => {
    const token = localStorage.getItem("trainer");
    const decoded = jwtDecode(token);
    const recipient_id = decoded.id;

    Swal.fire({
      title: "Confirm Connection",
      text: "Are you sure you want to delete request from this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        userAxios
          .delete(`withdraw-request/${userId}/${recipient_id}/`)
          .then((response) => {
            console.log(response);
            toast.success(response.data.message);
            setRefreshEffect(!refreshEffect);
            fetchApplications();
            Swal.fire({
              icon: "success",
              title: "Request Withdrawn",
              text: response.data.message,
            });
          })
          .catch((error) => {
            toast.error(
              "Failed to withdraw the connection request. Please try again later."
            );
            console.error("Error undoing connection request:", error);
            Swal.fire({
              icon: "error",
              title: "Request Error",
              text: error.response.data.message,
            });
          });
      }
    });
  };

  //   if (loading) {
  //     return (
  //       <div className="flex h-screen items-center justify-center">
  //         <PulseLoader size={10} color="#95a7a4" />
  //       </div>
  //     );
  //   }

  function acceptRequest(senderId) {
    console.log("From Tutor page::>>");
    const token = localStorage.getItem("trainer");
    const decoded = jwtDecode(token);
    const recipient_id = decoded.id;

    fetch(
      ` ${userAPI}/accept-request/${senderId}/${recipient_id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())

      .then((data) => {
        // Handle success (e.g., update UI)
        fetchApplications();
        console.log('Reechedddd/......',decoded);
        axios
          .get(`${chatAPI}/get-into-chat/${senderId}/${decoded.id}`)
          .then((response) => {
            console.log("handle message ==> ", response.data);
            navigate(`/trainer/chat/${response.data.channel_name}/${senderId}`);
          });
      });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Render your application data here */}
      <button
        className={`border rounded-lg p-1 px-2 mt-10 text-white mb-10 mr-10 hover:bg-gray-300 float-right ${
          status ? "bg-red-600" : "bg-green-500"
        }`}
        onClick={() => toggleOnline()}
      >
        {status ? "Go Offline" : "Go Online"}
      </button>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Level</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {applications?.map((application, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-white dark:bg-gray-800"
              } ${
                index === applications.length - 1
                  ? ""
                  : "border-b dark:border-gray-700"
              } hover:bg-gray-50 dark:hover:bg-gray-600`}
            >
              {/* Render application data here */}
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {application.username}
              </th>
              <td className="px-6 py-4">{application.email}</td>
              <td className="px-6 py-4">{application.user_level}</td>
              <td className="px-6 py-4">{application.phone}</td>

              <td>
                <div>
                  <button
                    className="bg-green-500 p-1 px-2 rounded-2xl text-white group hover:border-2 border-black"
                    onClick={() => acceptRequest(application.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 p-1 px-2 rounded-2xl text-white m-1 group hover:border-2 border-black"
                    onClick={() => handleIgnore(application.id)}
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
