import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

const BusRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routesSnapshot = await getDocs(collection(db, "routes"));
      setRoutes(routesSnapshot.docs.map(doc => doc.data()));
    };
    fetchRoutes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Bus Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index} className="p-2 border border-gray-200 mb-2">{route.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusRoutes;
