import React from "react";
import Navbar from "../../../components/user/navbar/Navbar";
import bghomeImage from "../../../assets/bghome4.jpg";
import Cards from "../../../components/user/section2/Cards";
import VipHome from "../../../components/user/viphome/VipHome";
import TrainerH from "../../../components/user/trainerhome/TrainerH";
import Footer from "../../../components/user/footer/Footer";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import userAxios from "../../../axios/userAxios";
import { useState } from "react";
import { userAPI } from "../../../constants/api";
import axios from "axios";
function Home() {
  const [profile, setProfile] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwtDecode(token);

  useEffect(() => {
    userAxios
      .get(`user-vip/${decoded.user_id}`)
      .then((response) => {
        setProfile(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  useEffect(() => {
    if (profile.is_vip) {
      const userVip = async () => {
        try {
          const request = await axios.get(
            `http://127.0.0.1:8000/payment/transaction`
          );
          const response = await request.data.filter((item) => item.user == decoded.user_id);
          if (request.status == 200) {
            console.log("This is the response: ", response)
            const currentDate = await new Date();
            console.log("Its is getting in here!!!")
            console.log("expires in: ", response[0].expires)
            if (response[0].expires < currentDate) {
              console.log(response.data);
              const req = await axios.patch(
                `http://127.0.0.1:8000/accounts/user-profile/${decoded?.user_id}/`,
                { is_vip: false }
              );
              console.log(req.data);
            }
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      userVip();
    }
  }, [profile]);

  return (
    <div>
      <Navbar />
      <div>
        <img
          className="bg-cover bg-center h-auto w-full "
          src={bghomeImage}
          alt=""
          srcset=""
        />
        <Cards />
      </div>
      {!profile.is_vip ? <VipHome /> : ""}
      <TrainerH />
      <Footer />
    </div>
  );
}

export default Home;
