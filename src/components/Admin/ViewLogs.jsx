import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewLogs = () => {
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

      <h1 className="text-3xl font-bold mb-6">Logs</h1>

      {/* Dummy Log Data */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">System Logs</h2>
        <ul className="list-disc pl-5">
          <li className="text-gray-700">[10/04/2024] Admin John added Route B</li>
          <li className="text-gray-700">[09/30/2024] Admin Jane updated Stop 14</li>
          <li className="text-gray-700">[09/28/2024] Admin Bob removed Route C</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">Error Logs</h2>
        <ul className="list-disc pl-5">
          <li className="text-red-600">[09/29/2024] Failed to update Stop 12</li>
          <li className="text-red-600">[09/26/2024] Route A - Payment gateway timeout</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">User Activity Logs</h2>
        <ul className="list-disc pl-5">
          <li className="text-gray-700">[10/01/2024] User tthabang438@gmail.com missed bus 225</li>
          <li className="text-gray-700">[09/30/2024] User tthabang438@gmail.com paid R 15.00 on bus 225</li>
        </ul>
      </div>
    </div>
  );
};

export default ViewLogs;

