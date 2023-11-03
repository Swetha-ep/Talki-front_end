import React, { useEffect,useState } from "react";
import loginImage from "../../../assets/login.jpg";
import adminLoginImage from "../../../assets/adminlogin.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate,  useLocation, Link } from "react-router-dom"; // Import navigate from react-router-dom
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginHandle } from "../../../hooks/LoginHandle";

function Login({ user }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');
  
  const isSuperuser = user === "admin" ? true  : false;
  useEffect(() => {
    document.title = "Login | Talki";
    if (message) {
      
      toast.info(message);
    }
  }, [message]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const {loginHandle} = useLoginHandle()
  
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setErrorMessage("");
      setErrorMessage2("");
      setLoading(true); 
      loginHandle({user , loginData})
    } else {
      if (!loginData.email) {
        setErrorMessage("Please enter your email");
      } else {
        setErrorMessage("");
      }
      if (!loginData.password) {
        setErrorMessage2("Please enter your password");
      } else {
        setErrorMessage2("");
      }
    }
  };
  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          {/* image */}
          <div className="sm:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src={user === "admin" ? adminLoginImage : loginImage}
              alt=""
              srcset=""
            />
          </div>
          {/* form*/}
          <div className="sm:w-1/2 px-16 ">
            <h1 className="font-extrabold text-2xl text-shadow text-center">
              TALKI <FontAwesomeIcon icon={faComment} />
              <span className="text-xs">
                {user === "admin" ? user.toUpperCase() : ""}
              </span>
            </h1>
            <br />
            <h1 className="font-bold text-xl text-center text-shadow ">
              LOGIN
            </h1>
            <form
              action="POST"
              onSubmit={handleLoginSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                className="p-2 mt-8 rounded-xl border"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
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
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="password"
                  current-password = "new password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  
                  className="bi bi-eye-fill absolute top-1/3 right-3 hover:cursor-pointer"
                  viewBox="0 0 16 16"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* ... (rest of your SVG code) */}
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
                      Not a member?{" "}
                      <a
                        className="underline hover:cursor-pointer"
                        href="/register"
                      >
                        Register
                      </a>
                    </span>
                  )}
                  <br />
                  <span>
                  <Link to= "/forgot-password">
                      Forgot password?
                  </Link> 
                  </span>
                </h3>
              </div>
              <button
                type="submit"
                className="py-2 text-white font-bold rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl"
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              {/* Replace the Google sign-up href with the appropriate URL */}
              
            </form>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

export default Login;
