import React from 'react'
import trainerImage from "../../../assets/trainer.jpg";
import { useNavigate } from 'react-router-dom';
function TrainerH() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row justify-center   mx-4 md:mx-32 mt-10">
      <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-4xl p-0 text-center ">
        
        <div className="sm:flex justify-center items-center mt-10">
          <img className="rounded-2xl sm:w-1/3" srcSet={trainerImage} alt="" />
          <div className="sm:w-1/2 px-8">
          <h1 className="font-bold mb-10">Become a tutor</h1>
            <p>
              Join our English tutoring community to enjoy flexible scheduling
              and rewarding conversations with people from all over the world.
            </p>

            {/* Content for the first section */}
            <div className="mt-14 flex justify-end">
              <button
              onClick={()=>navigate('/application-form') }
                type="button"
                className="py-2 px-4 text-white rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerH
