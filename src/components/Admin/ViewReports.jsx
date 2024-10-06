import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewReports = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mb-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {/* Dummy Report Data */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">Route Usage Report</h2>
        <p className="text-gray-700">Total number of trips: 125</p>
        <p className="text-gray-700">Most used route: Route A</p>
        <p className="text-gray-700">Total passengers: 3400</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">Revenue Report</h2>
        <p className="text-gray-700">Total Revenue: $45,000</p>
        <p className="text-gray-700">Peak Revenue Day: 23rd Sept</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Feedback Report</h2>
        <p className="text-gray-700">Total Feedback Received: 320</p>
        <p className="text-gray-700">Average Rating: 4.5/5</p>
      </div>
    </div>
  );
};

export default ViewReports;
