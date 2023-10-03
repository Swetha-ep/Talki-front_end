import React from "react";
import { useNavigate } from "react-router-dom";

function InfoTable() {
  const navigate = useNavigate();
  return (
    <div className=" lg:m-16 m-10 ">
      <div className="shadow-lg lg:p-14 p-7 rounded-md">
        <div className="flex justify-end " onClick={()=>navigate('/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-x-circle-fill"
            viewBox="0 0 25 25"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>
        <h1 className="font-semibold text-lg">
          We want to update you on the next steps in our application process. We
          are impressed with your qualifications and would like to proceed with
          further assessments.
        </h1>

        <h1 className="font-semibold text-lg pt-3">
          The next phase will consist of two parts:
        </h1>
        <h1 className="text-base p-2">
          {" "}
          1) Chat Session: In this session, we will have a discussion to gauge
          your communication skills, professionalism, and overall suitability
          for the role. It's also an opportunity for you to learn more about our
          organization and the role you've applied for.
        </h1>
        <h1 className="text-base p-2">
          {" "}
          2) Phone Interview: Following the chat session, we will schedule a
          phone interview to assess your fluency and spoken language skills.
          This interview will help us better understand your ability to
          communicate effectively over the phone, which is an important aspect
          of the position.
        </h1>
      </div>
    </div>
  );
}

export default InfoTable;
