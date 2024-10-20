import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobApplySuccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/browsejobspage'); 
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Application Submitted!</h1>
      <p className="text-lg mb-6">Thank you for applying. We have received your job application and will review it shortly.</p>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Back to Job Listings
      </button>
    </div>
  );
};

export default JobApplySuccessPage;
