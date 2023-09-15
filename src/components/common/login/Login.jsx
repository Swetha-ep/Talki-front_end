import React, { useState } from "react";
import loginImage from "../../../assets/login.jpg";
import adminLoginImage from '../../../assets/adminlogin.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'; 
import '@fortawesome/fontawesome-free/css/all.min.css';


function Login({ user }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setErrorMessage("");
      if (password) {
        setErrorMessage2("");
        console.log(email, password);
      } else {
        setErrorMessage2("Please enter your password");
      }
    } else {
      setErrorMessage("Please enter your email");
    }
  };

  return (
    <div>
    <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        {/* image */}

        <div className="sm:block hidden w-1/2">
          <img className="rounded-2xl" src={user === "admin" ? adminLoginImage : loginImage   } alt="" srcset="" />
        </div>

        {/* form*/}
        <div className="sm:w-1/2 px-16 ">
        <h1 className="font-extrabold text-2xl text-shadow text-center">
            TALKI <FontAwesomeIcon icon={faComment} />
             <span className="text-xs">{user === "admin" ? user.toUpperCase():""}</span>
          </h1>
          <br />
          <h1 className="font-bold text-xl text-center text-shadow ">
            LOGIN
          </h1>
          <form
            action="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              className="p-2 mt-8 rounded-xl border"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
            />
             {errorMessage && (
              <span className="text-red-500 text-xs">{errorMessage}</span>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="p-2 rounded-xl border w-full"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill absolute top-1/3 right-3 hover:cursor-pointer"
                viewBox="0 0 16 16"
                onClick={()=>setShowPassword(showPassword ? false : true)}
              >
                <path d={
                    showPassword
                      ? "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                      : "m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                  }/>
                <path  d={
                    showPassword
                      ? "M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      : "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                  }
                />
              </svg>
            </div>
            {errorMessage2 && (
              <span className="text-red-500 text-xs">{errorMessage2}</span>
            )}
            <div className="flex justify-between">
              <h3 className="text-xs hover:drop-shadow-xl ">
                {user === "admin" ? (
                  " "
                ) : (
                  <span>
                    Not a member? <a className="underline hover:cursor-pointer" href="/register">Register</a>
                  </span>
                )}
                <br/>
                <span>
                  <a className="text-xs hover:drop-shadow-xl hover:cursor-pointer underline " href="/forgot-password">
                     Forgot password?
                  </a>
                </span>
              </h3>
            </div>

            <button
              type="submit"
              className="py-2 text-white font-bold rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl "
            >
              {" "}
              Login
            </button>

          </form>
        </div>
      </div>
    </section>
  </div>
  );
}

export default Login;
