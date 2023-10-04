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
        We want to update you on the next steps in our application process. We have carefully reviewed your qualifications and are impressed with your credentials. As we move forward, we'd like to inform you that we are categorizing applicants into two positions, VIP and non-VIP, based on their reviews.
        </h1>

        <h1 className="font-semibold text-lg pt-3">
        The next phase will consist of one part:
        </h1>
        <h1 className="text-base p-2">
          {" "}
          Phone Interview: We will schedule a phone interview to assess your fluency and spoken language skills. This interview will help us better understand your ability to communicate effectively over the phone, which is an important aspect of the position.

The categorization into VIP and non-VIP positions will be determined based on your performance in the phone interview as well as your overall application.
        </h1>
        <h1 className="text-base p-2">
          {" "}
          Thank you for your interest in joining our organization, and we look forward to the upcoming phone interview.

        </h1>
      </div>
    </div>
  );
}

export default InfoTable;
