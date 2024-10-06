import React, { useState, useEffect } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import QRCodeGenerator from '../Driver/QRCodeGenerator';

const DriverDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [userId, setUserId] = useState(null); // Store the user ID once authenticated

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid); // Set the authenticated user's ID
        setLoading(false); // Stop loading once authenticated
      } else {
        console.log('No user is signed in');
        setLoading(false); // Stop loading even if no user is signed in
        
      }
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to driver document updates based on authenticated user
  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(doc(db, 'drivers', userId), (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setIsAvailable(data.isAvailable);
          setLocation(data.location);
        } else {
          console.log('Driver document does not exist');
        }
      });

      return () => unsubscribe();
    }
  }, [userId]);

  // Function to fetch current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    });
  };

  // Update location every 30 seconds when the driver is online
  useEffect(() => {
    let locationPulse;

    if (isAvailable && userId) {
      const updateLocationPulse = async () => {
        const newLocation = await getCurrentLocation();
        await updateDoc(doc(db, 'drivers', userId), {
          location: newLocation,
        });
        setLocation(newLocation);
      };

      // Run the pulse every 30 seconds
      locationPulse = setInterval(updateLocationPulse, 30000); // 30 seconds
    }

    return () => {
      if (locationPulse) {
        clearInterval(locationPulse); // Clear interval when going offline or unmounting
      }
    };
  }, [isAvailable, userId]);

  const handleToggleAvailability = async () => {
    const newIsAvailable = !isAvailable;
    const newLocation = newIsAvailable ? await getCurrentLocation() : null;

    if (userId) {
      await updateDoc(doc(db, 'drivers', userId), {
        isAvailable: newIsAvailable,
        location: newLocation,
      });
      setIsAvailable(newIsAvailable);
      setLocation(newLocation);
    }
  };

  // Show a loading spinner or placeholder while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, show a message
  if (!userId) {
    return <div>Please sign in to access the driver dashboard.</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>

        {/* Display online/offline status */}
        <div className="flex justify-center items-center mb-4">
          <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-500" />
          <p className="text-lg">{isAvailable ? 'Online' : 'Offline'}</p>
        </div>

        {/* Display location if available */}
        {location && (
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
            <p className="text-lg">Latitude: {location.lat}, Longitude: {location.lng}</p>
          </div>
        )}

        {/* Toggle availability button */}
        <button
          onClick={handleToggleAvailability}
          className={`mt-8 p-2 w-full rounded-lg ${isAvailable ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isAvailable ? 'Go Offline' : 'Go Online'}
        </button>

        {/* QR Code Scanner section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">QR Code Scanner</h3>
          <p>Scan passengers' QR codes to verify payment and boarding.</p>
          <div className="mt-4">
            {/* Render the QRCodeGenerator component */}
            <QRCodeGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
