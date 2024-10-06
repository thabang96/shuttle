import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faMapMarkerAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminPanel = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mb-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6 border-b-2 pb-2">Admin Panel</h1>

      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-medium">Total Routes</h3>
            <p className="text-4xl font-bold text-blue-500">12</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-medium">Total Stops</h3>
            <p className="text-4xl font-bold text-blue-500">34</p>
          </div>
        </div>
      </div>

      {/* Navigation Links for Managing Routes and Stops */}
      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/admin/routes"
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faRoute} />
          <span>Manage Routes</span>
        </Link>
        <Link
          to="/admin/stops"
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Manage Stops</span>
        </Link>
      </div>

      {/* Additional Admin Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Admin Actions</h2>
        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/admin/reports"
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg"
          >
            View Reports
          </Link>
          <Link
            to="/admin/logs"
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg"
          >
            View Logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
