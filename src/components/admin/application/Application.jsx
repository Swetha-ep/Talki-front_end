import React from 'react'
import { PaperClipIcon } from '@heroicons/react/20/solid'

function Application() {
  return (
    <div className="flex flex-col md:flex-row justify-center md:mx-32 mt-3">
      <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-full p-5 px-10 text-center mt-5 justify-center ">
      <div className="px-4 sm:px-0">
        <h3 className=" font-semibold leading-7 text-gray-900 ">Applicant Information</h3>
        <p className="mt-1 max-w-2xl  leading-6 text-gray-500"></p>
      </div>
      
      <div className="mt-6 border-t border-gray-100 ">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20">Full name</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">Margot Foster</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20">Country</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">India</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20">About</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">Hi this is Mike from Ireland. It would be my pleasure to talk and tutor you. It will be my pleasure getting to know you and improving your English at the same time. I am friendly and very easy to talk with. I would love to meet you here and help with your progress.</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20">Email address</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">margotfoster@example.com</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20">Teaching style:</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">I am happy teaching adults of any age. I am patient, understanding and easy going. When I am tutoring English I want my student to enjoy the lesson while improving their talking and grammar. If we need to be a little serious we can do that or if we just want a fun discussion, I am comfortable with both. </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20"> Work Experience:</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
            <span className='font-semibold'>Business Development Manager IT : </span>
            I work for an Australian company but am based in Philippines. We buy and sell laptops and tablets from schools and businesses in Australia and New Zealand.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20"> Education:</dt>
            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
            <span className='font-semibold'>College : Sports and Athletics : </span>
            I studied Sports Science<br/>
            <span className='font-semibold'>High School : Writing and Journalism : </span>
            I got 4 A levels including English Language and English Literature.
            </dd>
            
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className=" font-medium leading-6 text-gray-900 text-left ml-20">Attachments: (optional)</dt>
            <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5  leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5  leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    </div>
  )
}

export default Application
