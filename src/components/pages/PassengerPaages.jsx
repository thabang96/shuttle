import React, { useState, useEffect } from 'react';
import WalletTopUp from '../passenger/WalletTopUp';
import QRCodeGenerator from '../passenger/QRCodeGenerator';
import BusMap from '../Bus/BusMap';
import { useNavigate } from 'react-router-dom';

const PassengerPage = () => {
  const [userID, setUserID] = useState(null);
  const [tripID, setTripID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching userID and tripID from an API or user session
    const fetchedUserID = "real-user-id"; // Replace with real logic
    const fetchedTripID = "real-trip-id"; // Replace with real logic

    // Set the fetched values
    setUserID(fetchedUserID);
    setTripID(fetchedTripID);
  }, []);

  if (!userID || !tripID) {
    return <div>Loading...</div>; // Show a loading message until userID and tripID are available
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-gray-800 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded shadow-sm"
      >
        Back
      </button>

      {/* Main Dashboard Container */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6 border-b pb-4">Passenger Dashboard</h2>

        {/* Wallet Top-Up Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Top-Up Wallet</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <WalletTopUp />
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Your Trip QR Code</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <QRCodeGenerator userID={userID} tripID={tripID} />
          </div>
        </div>

        {/* Bus Location Tracking */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Bus Location</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <BusMap />
          </div>
        </div>

        {/* SOS Emergency Button */}
        <button
          onClick={() => alert('Authorities alerted!')}
          className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow-md transition-opacity duration-200 opacity-80 hover:opacity-100"
          style={{
            display: 'inline-block',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 10,
          }}
        >
          SOS
        </button>
      </div>
    </div>
  );
};

export default PassengerPage;
