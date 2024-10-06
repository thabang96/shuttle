import React, { useState } from 'react';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import GoogleMapReact from 'google-map-react';  // To show the map, install google-map-react: npm install google-map-react

const RoutesForm = () => {
  const [routeName, setRouteName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: -25.7479, lng: 28.2293 });  // Default center (Pretoria, South Africa)
  const [zoom, setZoom] = useState(12);

  const handleAddRoute = async (e) => {
    e.preventDefault();
    try {
      // Save route and coordinates to Firebase
      await addDoc(collection(db, "routes"), { 
        name: routeName,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }
      });
      alert('Route Added Successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      
      <form onSubmit={handleAddRoute} className="mb-6">
        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Route</button>
      </form>

      {/* Display Map */}
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
          {/* Marker for selected location */}
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

export default RoutesForm;
