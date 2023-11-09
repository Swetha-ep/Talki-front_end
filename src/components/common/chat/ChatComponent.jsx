import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { w3cwebsocket } from "websocket";
import jwtDecode from "jwt-decode";
import { chatAPI } from "../../../constants/api";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import userAxios from "../../../axios/userAxios";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ChatComponent() {


  const [rating, setRating] = useState(0);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const { channelName } = useParams();
  const { trainer } = useParams();
  const token = localStorage.getItem("user");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);

  const [formData,setformData] = useState({
    rating: null,
    trainer : null,
    user : null,
  })
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const messageRef = useRef();

  const setInitialDetails = () => {
    axios
      .get(`${chatAPI}/get-into-chat/${decoded.id}/${trainer}`)
      .then((response) => {
        if (response.status == 404) {
          navigate("/tutors");
          toast.error("There is no such connection");
        }
        setRecipientDetails(response.data.trainer);
      })
      .catch((err) => {
        navigate("/tutors");
        toast.error("Something went wrong");
      });
  };

  const handleStarClick = (value) => {
    setRating(value);
    formData.rating = value
    formData.trainer = trainer

    
    setformData({ ...formData, user: decoded.id });

    
  };

  const handleRatingSubmit = () => {
    
    console.log(`Selected rating value: ${rating}`);
    console.log(formData )
    userAxios.post('rate-trainer/',formData)
    .then((res)=> {
      toast.success(res.data.message);
      setRatingSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "Completed",
        text: res.data.message,
      })
      console.log(res)
    })
    .catch((error) => {
      toast.error("Error in rating")
      console.log("Error in rating trainer", error)
      Swal.fire({
        icon: "error",
        title: "Request Error",
        text: error.response.data.message,
      });
    })
    
    setIsRatingModalOpen(false);
    
  };

  const handleExitChat = () => {
    const token = localStorage.getItem("user");
    const decoded = jwtDecode(token);
    const sender_id = decoded.id;

    
        userAxios
          .delete(`withdraw-request/${sender_id}/${trainer}/`)
          .then((response) => {
            toast.success(response.data.message);
            Swal.fire({
              icon: "success",
              title: "Chat exited",
              text: response.data.message,
            }).then(() => {
              navigate("/tutors");
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
    

  const setUpChat = () => {
    axios
      .get(`${chatAPI}/user-previous-chats/${channelName}/`)
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      });

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
  }, [ratingSubmitted]);

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
        sender: "user",
      })
    );
    messageRef.current.value = "";
  };

  const renderStars = () => {
    const starSize = "2x";
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'lightgray' }}
          size={starSize}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };



 
  return (
    <div className="w-1/2 max-h-screen mx-auto">
      <div className="flex flex-row items-center p-4 bg-gray-300  border-l-2 border-black-500">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold flex-shrink-0">
          T
        </div>
        <div className="flex flex-col flex-grow ml-3">
          <div className="flex items-center">
            <div className="text-sm font-medium">{recipientdetails?.name}</div>
          </div>
        </div>
      </div>
      <div className="h-[38rem]  py-4">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">
            {messages.map((message) => {
              return message.sender == "user" ? (
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 flex-shrink-0">
                      {
                      decoded.username ?
                      decoded.username[0] +  decoded.username[1]
                      :''}
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white flex-shrink-0">
                      {recipientdetails.name
                        ? recipientdetails.name[0] + recipientdetails.name[1]
                        : ""}
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
          onClick={() => setIsRatingModalOpen(true)}
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Rate Trainer
        </button>
        </div>

        {isRatingModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-300 bg-opacity-80">
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
  onClick={() => setIsRatingModalOpen(false)}
  className="absolute top-3 right-3 text-white-400 bg-white-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-400 dark:hover:text-white"
  data-modal-hide="popup-modal"
>
  <span className="sr-only">Close modal</span>
  <svg
    className="w-3 h-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1 13 13M13 1 1 13"
    />
  </svg>
</button>
                <div className="p-6 text-center">
                  {/* Content centered */}
                  <div className="flex flex-col items-center">
                  <div className="px-12 py-5">
      <h2 className="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
    </div>
                    {/* Stars and Submit button centered */}
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-3">{renderStars()}</div>
                      <button onClick={handleRatingSubmit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-7">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;
