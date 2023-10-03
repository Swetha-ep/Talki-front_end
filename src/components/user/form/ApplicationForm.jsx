import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAxios from "../../../axios/userAxios";
import axios, { Axios } from "axios";
import { userAPI } from "../../../constants/api";
function ApplicationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aboutMe: "",
    teachingStyle: "",
    workExperience: "",
    education: "",
  });

  // useEffect(() => {
    
  //   axios
  //     .get("http://127.0.0.1:8000/accounts/check-previous-submission/")
  //     .then((response) => {
  //       const previousData = response.data; 
  //       if (previousData) {
          
  //         setFormData(previousData);
  //       }
  //     })
  //     .catch((error) => {
        
  //       console.error("Error fetching previous submission data:", error);
  //     });
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
        .post("http://127.0.0.1:8000/accounts/submit-application/", formData)
      .then((response) => response.json())
      .then((data) => {
        toast.success("Application submitted successfully")
        console.log("Application submitted successfully:", data);
        navigate("/application-info");
      })
      .catch((error) => {
        toast.error("Error submitting application")
        console.error("Error submitting application:", error);
      });
  };
  return (
    <div className="lg:m-16 m-10">
      <div className="shadow-lg lg:p-14 p-7 rounded-md">
        <h1 className="font-semibold text-lg">Welcome to Talki!</h1>
        <h1 className="lg:mt-6 mt-3 text-xs lg:text-base ">
          On behalf of our students, we’re so happy you’re here. Speaking
          English with a foreigner can be intimidating, but with your warmth,
          patience, and guidance, the students you meet will be chatting with
          confidence in no time! The Talki Tutor signup process takes about 15
          minutes, and we’ll guide you through each step.
        </h1>
        <form onSubmit={handleSubmit}>
        <div className="flex mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-fill m-1"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <h1 className="">Name :</h1>
        </div>
        <textarea
          type="text"
          name="name"
          
          value={formData.name}
          onChange={handleChange}
          className="h-15 rounded-lg bg-[#D9D9D9] border w-80 m-2"
        />
        
        <div className="flex mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-fill m-1"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <h1 className="">Phone :</h1>
        </div>
        <textarea
          type="text"
          name="phone"
          
          value={formData.phone}
          onChange={handleChange}
          className="h-15 rounded-lg bg-[#D9D9D9] border w-80 m-2"
        />
        <div className="flex mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-fill m-1"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <h1 className="">About me :</h1>
        </div>
        <textarea
          type="text"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleChange}
          className="h-20 rounded-lg bg-[#D9D9D9] border w-full m-2"
        />
        <div className="flex mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-video3 m-1"
            viewBox="0 0 16 16"
          >
            <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
          </svg>
          <h1 className="">Teaching style :</h1>
        </div>
        <textarea
          type="text"
          name="teachingStyle"
          value={formData.teachingStyle}
          onChange={handleChange}
          className="h-20 rounded-lg bg-[#D9D9D9] border w-full m-2"
        />

        <div className="flex mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-briefcase-fill m-1"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
            <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
          </svg>

          <h1>Work experience :</h1>
        </div>
        <textarea
          type="text"
          name="workExperience"
          value={formData.workExperience}
          onChange={handleChange}
          className="h-20 rounded-lg bg-[#D9D9D9] border w-full m-2"
        />
        <div className="flex mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-briefcase-fill m-1"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
            <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
          </svg>

          <h1>Education :</h1>
        </div>
        <textarea
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="h-20 rounded-lg bg-[#D9D9D9] border w-full m-2"
        />

        <div className="flex justify-end mt-2">
          <button type="submit"
            className="p-1 px-6 rounded-lg bg-[#D9D9D9]"
            
          >
            Save
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;