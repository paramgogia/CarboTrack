import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import startIconImg from '../images/rb_41566.png';
import destinationIconImg from './loc-removebg-preview.png';
import { Button } from '../@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../@/components/ui/select';
import { useTheme } from '../context/ThemeContext';




// Define CO₂ emissions per km for each vehicle type
const vehicleEmissions = {
  Car: 0.12,
  MotorBike: 0.04,
  Truck: 0.15,
  Walk: 0,
  
};

const GeolocationMap = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-green-200' : 'text-green-700';
const bgColor = theme === 'dark' ? 'bg-navy-900' : 'bg-gray-100';
const cardBg = theme === 'dark' ? 'bg-white bg-opacity-10' : 'bg-white bg-opacity-90';
const subTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(null);
  const [vehicle, setVehicle] = useState('Car');
  const [emission, setEmission] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown open state

  useEffect(() => {
    const map = L.map(mapRef.current).setView([19.123593189588732, 72.83625487086034], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    const startIcon = L.icon({ iconUrl: startIconImg, iconSize: [40, 40] });
    const destinationIcon = L.icon({ iconUrl: destinationIconImg, iconSize: [40, 40] });
    const marker = L.marker([19.123593189588732, 72.83625487086034], { icon: startIcon }).addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const newMarker = L.marker([lat, lng], { icon: destinationIcon }).addTo(map);

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(19.123593189588732, 72.83625487086034), L.latLng(lat, lng)],
      })
        .on('routesfound', (e) => {
          const route = e.routes[0];
          const summary = route.summary;
          const newDistance = (summary.totalDistance / 1000).toFixed(2);
          setDistance(newDistance);
          setTime((summary.totalTime / 60).toFixed(2));
          setEmission((newDistance * vehicleEmissions[vehicle]).toFixed(2));

          route.coordinates.forEach((coord, index) => {
            setTimeout(() => marker.setLatLng([coord.lat, coord.lng]), 100 * index);
          });
        })
        .addTo(map);

      return () => map.removeControl(routingControl);
    });

    return () => {
      map.off();
      map.remove();
    };
  }, [vehicle]);

  return (
    <div className={`flex flex-col items-center p-6  min-h-screen ${theme === 'dark' ? 'bg-indigo-950' : 'bg-gray-100' } rounded-xl z-10`}>
      <h2 className={`text-3xl font-bold ${textColor} mb-6`}>Shortest CO₂-Friendly Pathway</h2>

      <div ref={mapRef} className="w-full max-w-5xl h-[60vh] rounded-lg shadow-lg overflow-hidden mb-6 border border-gray-300 z-0" />

      <div className={`flex flex-col items-center w-full max-w-2xl bg-white p-5 rounded-xl shadow-lg mb-6 text-center ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100' } space-y-4 ${dropdownOpen ? 'mb-4' : ''}`}>
        <div className="flex flex-col items-center w-full">
          <label className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Select Vehicle Type:</label>
          <Select
            value={vehicle}
            onValueChange={(value) => setVehicle(value)}
            onOpenChange={setDropdownOpen} // Detect dropdown open state
            className="w-full max-w-md border-gray-300 rounded-md shadow-sm bg-slate-100"
          >
            <SelectTrigger className="w-full bg-slate-100">
              <SelectValue placeholder="Choose a Vehicle" />
            </SelectTrigger>
            <SelectContent className="w-full bg-slate-100 cursor-pointer ">
              {Object.keys(vehicleEmissions).map((type) => (
                <SelectItem className="hover:bg-slate-500 cursor-pointer border-3 "key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Display Distance, Time, and CO₂ Emission */}
        <p className="text-lg font-medium {theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mt-4">
          <span className="text-green-700 font-semibold">Distance:</span> {distance} km
        </p>
        <p className="text-lg font-medium {theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}">
          <span className="text-green-700 font-semibold">Estimated Time:</span> {time ? `${time} mins` : 'Calculating...'}
        </p>
        <p className="text-lg font-medium {theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}">
          <span className="text-green-700 font-semibold">CO₂ Emission:</span> {emission} kg
        </p>
      </div>

      <Button className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-600">Calculate New Route</Button>
    </div>
  );
};

export default GeolocationMap;
