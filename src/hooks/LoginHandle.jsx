import adminAxios from "../axios/adminAxios";
import userAxios from "../axios/userAxios";
import trainerAxios from "../axios/trainerAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
          
          localStorage.setItem("user", token);
          const Token=localStorage.getItem('user') 
          console.log({Token})
          window.location.href='/'         
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
