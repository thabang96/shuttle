import React, { useState } from 'react';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import GoogleMapReact from 'google-map-react';  // Install google-map-react if not done: npm install google-map-react

const StopForm = () => {
  const [stopName, setStopName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -25.7479, lng: 28.2293 }); // Pretoria coordinates
  const [zoom, setZoom] = useState(12);

  const handleAddStop = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "stops"), { 
        name: stopName,
        location: {
          latitude: latitude,
          longitude: longitude,
        }
      });
      alert('Stop Added Successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleAddStop} className="mb-6">
        <input
          type="text"
          placeholder="Stop Name"
          value={stopName}
          onChange={(e) => setStopName(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude || ''}
          readOnly
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude || ''}
          readOnly
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Stop</button>
      </form>

      {/* Map for selecting stop location */}
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
          center={mapCenter}
          zoom={zoom}
          onClick={({ lat, lng }) => {
            setLatitude(lat);
            setLongitude(lng);
            setMapCenter({ lat, lng });
          }}
        >
          {/* Marker for the stop location */}
          {latitude && longitude && (
            <div
              lat={latitude}
              lng={longitude}
              style={{
                height: '20px',
                width: '20px',
                backgroundColor: 'red',
                borderRadius: '50%',
              }}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default StopForm;
