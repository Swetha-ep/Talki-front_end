import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import adminAxios from '../../../axios/adminAxios';

function Application() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    
    // const apiUrl = `http://127.0.0.1:8000/dashboard/application-detail/${id}`;

    adminAxios.get
    (`/application-detail/${id}`)
    .then((response) => {
      setApplication(response.data);
      })
      .catch((error) => {
        console.error('Error fetching application details:', error);
      });
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row justify-center md:mx-32 mt-3">
      <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-full p-5 px-10 text-center mt-5 justify-center">
        <div className="flex justify-end" onClick={() => navigate('/admin/application-list')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x-circle-fill w-8 h-8"
            viewBox="0 0 25 25"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>
        <div className="px-4 sm:px-0">
          <h3 className="font-semibold leading-7 text-gray-900">Applicant Information</h3>
          <p className="mt-1 max-w-2xl leading-6 text-gray-500"></p>
        </div>

        <div className="mt-6 border-t border-gray-100">
          {application ? (
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">Full name</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">Email</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.user.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">Phone</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">About</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.about_me}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">Teaching style</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.teaching_style}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">Work experience</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.work_experience}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-gray-900 text-left ml-20">Education</dt>
                <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-left">
                  {application.education}
                </dd>
              </div>
              {/* Render other application details similarly */}
            </dl>
          ) : (
            <p>Loading application details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Application;
