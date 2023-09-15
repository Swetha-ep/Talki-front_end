import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faBook,faSuitcase,faGraduationCap }from '@fortawesome/free-solid-svg-icons'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

function ProfileT() {
  return (
    <div className="flex flex-col md:flex-row justify-center md:mx-32 mt-5">
      <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-full p-5 px-10 text-center mt-10 justify-center ">
      <FontAwesomeIcon className='ml-auto' icon={faTimes} />
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Your Image"
            className="mx-auto mb-4 h-16 w-16 rounded-full mt-10"
            // style={{ width: '100px', height: '100px' }}
          />
          <p className='font-bold '>
            Shoji
          </p>
          <p>
            Japan
          </p>
          <p className='mt-10 font-light '>
          Hi this is Mike from Ireland. It would be my pleasure to talk and tutor you. It will be my pleasure getting to know you and improving your English at the same time. I am friendly and very easy to talk with. I would love to meet you here and help with your progress.
          </p>
          <h1 className='font-bold mt-10  text-left'><FontAwesomeIcon className='mr-1' icon={faBook} /> 
             Teaching style:
          </h1>
          <p className='mt-5 text-left'>
          I am happy teaching adults of any age. I am patient, understanding and easy going. When I am tutoring English I want my student to enjoy the lesson while improving their talking and grammar. If we need to be a little serious we can do that or if we just want a fun discussion, I am comfortable with both. 
          </p>
          <h1 className='font-bold mt-10 text-left'><FontAwesomeIcon className='mr-1' icon={faSuitcase} /> 
           Work Experience:
          </h1>
          <p className='mt-5 text-left font-semibold'>
          Business Development Manager IT
          </p>
          <p className='mt-2 text-left'>
          I work for an Australian company but am based in Philippines. We buy and sell laptops and tablets from schools and businesses in Australia and New Zealand.
          </p>
          <h1 className='font-bold mt-10 text-left'><FontAwesomeIcon className='mr-1' icon={faGraduationCap} /> 
          Education:
          </h1>
          <p className='mt-6 text-left font-semibold'>
          College : Sports and Athletics
          </p>
          <p className='mt-2 text-left'>
          I studied Sports Science
          </p>
          <p className='mt-6 text-left font-semibold'>
          High School : Writing and Journalism
          </p>
          <p className='mt-2 text-left'>
          I got 4 A levels including English Language and English Literature.
          </p>
          {/* Content for the first section */}
        </div>
    </div>
  )
}

export default ProfileT
