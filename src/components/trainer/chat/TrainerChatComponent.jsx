import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { w3cwebsocket } from "websocket";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import userAxios from "../../../axios/userAxios";
import {chatAPI} from '../../../constants/api'

export default function TrainerChatComponent() {
  const { channelName } = useParams();
  const { user } = useParams();
  const token = localStorage.getItem("trainer");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  const [userdetails, setUserDetails] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = useRef();

  const setInitialDetails = () => {
    axios
      .get(`${chatAPI}/get-into-chat/${user}/${decoded.id}`)
      .then((response) => {
        if (response.status == 404) {
          navigate("/tutors");
          toast.error("There is no such connection");
        }
        setUserDetails(response.data.user);
      })
      .catch((err) => {
        navigate("/trainer/requests");
        toast.error("Something went wrong");
      });
  };

  const handleExitChat = () => {
    const token = localStorage.getItem("trainer");
    const decoded = jwtDecode(token);

    Swal.fire({
      title: "Confirm Connection",
      text: "Are you sure you want to Exit from Chat?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        userAxios
          .delete(`withdraw-request/${user}/${decoded.id}/`)
          .then((response) => {
            toast.success(response.data.message);
            Swal.fire({
              icon: "success",
              title: "Chat exted",
              text: response.data.message,
            }).then(() => {
              navigate("/trainer/requests");
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

  const setUpChat = () => {

    axios.get(`${chatAPI}/user-previous-chats/${channelName}/`).then((response) => {
        if (response.status == 200) {
            setMessages(response.data)
        }
    })

    const client = new w3cwebsocket(`ws://localhost:8000/chat/${channelName}/`);

    setClientState(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender: dataFromServer.sender,
          },
        ]);
      }
    };

    client.onclose = () => {
      console.log("Websocket disconnected");
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    setInitialDetails();
  }, []);

  useEffect(() => {
    setUpChat();
  }, [channelName]);

  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        sender: "trainer",
      })
    );
    messageRef.current.value = "";
  };

  return (
    <div className="w-1/2 max-h-screen mx-auto">
      <div className="flex flex-row items-center p-4 bg-gray-300 border-l-2 border-black-500">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold flex-shrink-0">
          T
        </div>
        <div className="flex flex-col flex-grow ml-3">
          <div className="flex items-center">
            <div className="text-sm font-medium">{userdetails?.name}</div>
          </div>
        </div>
      </div>
      <div className="h-[38rem]  py-4">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">
            {messages?.map((message) => {
              return message.sender == "trainer" ? (
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white flex-shrink-0">
                    {
                        decoded?.username?
                        decoded.username[0] + decoded.username[1] 
                        :''
                      }
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>{message.message}</div>
                      {/* <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                        Seen
                      </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      {
                        userdetails.name ?
                        userdetails.name[0] + userdetails.name[1] 
                        :''
                      }
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>{message.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-row items-center w-full border-2 border-gray-800 rounded-3xl h-12 px-2">
            <div className="w-full">
              <input
                ref={messageRef}
                type="text"
                className="border border-transparent rounded w-full focus:outline-none text-sm h-10 flex items-center"
                placeholder="Type your message...."
              />
            </div>
          </div>
          <div className="ml-6">
            <button
              onClick={onButtonClicked}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 hover:bg-gray-300 text-indigo-800 text-white"
            >
              <svg
                className="w-5 h-5 transform rotate-90 -mr-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex p-4 justify-center">
          <button
            onClick={handleExitChat}
            type="button"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Exit Chat
          </button>
        </div>
      </div>
    </div>
  );
}
