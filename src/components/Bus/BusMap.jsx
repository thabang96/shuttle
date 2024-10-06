import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from '../../firebase';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

const DriverMarker = ({ text }) => (
  <div className="marker">
    <FontAwesomeIcon icon={faBus} className="text-green-500 text-2xl" />
    <div>{text}</div>
  </div>
);

const PassengerMarker = ({ text }) => (
  <div className="marker">
    <FontAwesomeIcon icon={faCircle} className="text-blue-500 text-2xl" />
    <div>{text}</div>
  </div>
);

const BusMap = () => {
  const [userData, setUserData] = useState(null); // Current logged-in user data
  const [availableDrivers, setAvailableDrivers] = useState([]); // List of available drivers
  const [userType, setUserType] = useState(null); // 'driver' or 'passenger'
  const [center, setCenter] = useState({ lat: -25.7479, lng: 28.2293 }); // Default map center (Pretoria)
  const [zoom, setZoom] = useState(12); // Default zoom level

  useEffect(() => {
    // Function to fetch logged-in user data (either a driver or passenger)
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        // Check if the current user is a driver
        const driverDoc = await getDoc(doc(db, 'drivers', userId));
        if (driverDoc.exists()) {
          setUserData(driverDoc.data());
          setUserType('driver');
          setCenter({
            lat: driverDoc.data().location?.lat || -25.7479,
            lng: driverDoc.data().location?.lng || 28.2293,
          });
        } else {
          // Check if the current user is a passenger
          const passengerDoc = await getDoc(doc(db, 'passengers', userId));
          if (passengerDoc.exists()) {
            setUserData(passengerDoc.data());
            setUserType('passenger');
            setCenter({
              lat: passengerDoc.data().location?.lat || -25.7479,
              lng: passengerDoc.data().location?.lng || 28.2293,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Function to fetch all available drivers
    const fetchAvailableDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'drivers'));
        const drivers = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(driver => driver.isAvailable); // Only include drivers that are available

        setAvailableDrivers(drivers);
      } catch (error) {
        console.error('Error fetching available drivers:', error);
      }
    };

    fetchUserData();
    fetchAvailableDrivers();
  }, []);

  return (
    <div className="map-container" style={{ height: '400px', width: '100%' }}>
      <h2 className="text-center text-2xl mb-4">Bus Location</h2>

      {userData ? (
        <div className="flex items-center justify-center mb-4">
          {userType === 'driver' ? (
            <>
              <FontAwesomeIcon icon={faBus} className="text-blue-500 mr-2" />
              <span>{userData.name} (Driver) - Location: {userData.location?.lat}, {userData.location?.lng}</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCircle} className="text-blue-700 mr-2" />
              <span>{userData.name} (Passenger) - Location: {userData.location?.lat}, {userData.location?.lng}</span>
            </>
          )}
        </div>
      ) : (
        <p className="text-center">Loading user data...</p>
      )}

      <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }} // Replace with your Google Maps API key
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
      >
        {/* Mark current user on the map */}
        {userData && userData.location && (
          userType === 'driver' ? (
            <DriverMarker
              lat={userData.location.lat}
              lng={userData.location.lng}
              text={userData.name}
            />
          ) : (
            <PassengerMarker
              lat={userData.location.lat}
              lng={userData.location.lng}
              text={userData.name}
            />
          )
        )}

        {/* Mark all available drivers on the map */}
        {availableDrivers.map(driver => (
          <DriverMarker
            key={driver.id}
            lat={driver.location.lat}
            lng={driver.location.lng}
            text={driver.name}
          />
        ))}
      </GoogleMapReact>

      <h3 className="text-center text-xl mb-4">Available Drivers</h3>
      <div className="available-drivers">
        {availableDrivers.length > 0 ? (
          availableDrivers.map(driver => (
            <div key={driver.id} className="flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faBus} className="text-green-500 mr-2" />
              <span>{driver.name} - Location: {driver.location?.lat}, {driver.location?.lng}</span>
            </div>
          ))
        ) : (
          <p className="text-center">No drivers available.</p>
        )}
      </div>
    </div>
  );
};

export default BusMap;
