import adminAxios from "../axios/adminAxios";
import userAxios from "../axios/userAxios";
import trainerAxios from "../axios/trainerAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from 'jwt-decode';

export const useLoginHandle = () => {
    
    const navigate = useNavigate();
    const loginHandle = (props) => {
      const {  user , loginData } = props;
    if (user === "user") {
      userAxios
        .post("/login", loginData)
        .then((res) => {
          const token = res.data?.access;
          console.log({token})
          const decoded = jwtDecode(token);
          
          if(decoded.is_trainer === false){
            localStorage.setItem("user", token);
            const Token=localStorage.getItem('user') 
            console.log({Token})
            window.location.href='/'
          }else if (decoded.is_trainer === true){
            const Token=localStorage.setItem('trainer' , token) 
            navigate('/trainer/home');
          }
                   
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid credentials")
          
        });
    } else if (user === "trainer") {
      trainerAxios
        .post("/login", loginData)
        .then((res) => {
          const token = res.data?.access;
          
          localStorage.setItem("trainer", token);
          window.location.href="/trainer/home"
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid credentials")
        });
    } else if (user === "admin") {
      adminAxios
        .post("/login", loginData)
        .then((res) => {
          const token = res.data?.access;
          localStorage.setItem("admin", token);
          window.location.href="/admin"
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid credentials")
        });
    }
  }
  return {loginHandle}
};
