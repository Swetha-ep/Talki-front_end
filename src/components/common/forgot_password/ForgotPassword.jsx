import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userAxios from '../../../axios/userAxios';

import forgotImage from "../../../assets/forgot.jpg";

function ForgotPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');

  useEffect(() => {
    document.title = "ForgotPassword | Talki";
    if (message) {
      toast.info(message);
    }
  }, [message]);

  const [loginData, setLoginData] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(loginData.email.trim())) {
      setErrorMessage("Enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await userAxios.post(`forgotpassword/`, loginData);
      
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <div className="sm:block hidden w-1/2">
            <img className="rounded-2xl" src={forgotImage} alt="" />
          </div>
          
          <div className="sm:w-1/2 px-16">
            <h1 className="font-extrabold text-2xl text-shadow text-center">
              TALKI <FontAwesomeIcon icon={faComment} />
            </h1>
            <br />
            <h1 className="font-bold text-xl text-center text-shadow ">
              Password Reset
            </h1>
            <form action="POST" onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                className="p-2 mt-10 rounded-xl border"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
              />
              {errorMessage && (
                <span className="text-red-500 text-xs">{errorMessage}</span>
              )}
              <div className="relative"></div>
              
              <div className="flex justify-between">
                <h3 className="text-xs hover:drop-shadow-xl">
                  <span>
                    Not a member?{' '}
                    <Link to="/register" className="underline hover:cursor-pointer">
                      Register
                    </Link>
                  </span>
                  <br />
                </h3>
              </div>
              <button
                type="submit"
                className="py-2 text-white font-bold rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

export default ForgotPassword;
