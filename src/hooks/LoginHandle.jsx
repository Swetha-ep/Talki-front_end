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
    if (user !=="admin") {
      userAxios
        .post("/login", loginData)
        .then((res) => {
          const token = res.data?.access;
          console.log({token})
          const decoded = jwtDecode(token);
          const role = decoded.user_role == "trainer" ? 'trainer' : decoded.user_role == 'user' ? 'user' : 'admin';
          localStorage.setItem(role, token);
          if(role === "user"){
            window.location.href='/';

          }else if(role === "trainer"){
            window.location.href='/trainer/home';

          }else{
            window.location.href='/admin/dashboard';
          }
                   
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.detail) {
            toast.error(error.response.data.detail);
          } else {
            toast.error('An error occurred');
          }
          
        });
    // } else if (user === "trainer") {
    //   trainerAxios
    //     .post("/login", loginData)
    //     .then((res) => {
    //       const token = res.data?.access;
    //       const decoded = jwtDecode(token);
    //       const role = decoded.is_trainer ? 'trainer' : 'user'
    //       localStorage.setItem(role, token);
    //       window.location.href="/trainer/home"
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       toast.error("Invalid credentials")
    //     });
    } else if (user === "admin") {
      adminAxios
        .post("/login", loginData)
        .then((res) => {
          const token = res.data?.access;
          const decoded = jwtDecode(token);
          const role = decoded.role ? 'admin' : '';
          localStorage.setItem(role, token);
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
