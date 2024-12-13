import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';
import { Input } from '../@/components/ui/input';
import { Button } from '../@/components/ui/button';
import { MapPin, Navigation, Bus, Car, Train } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../@/components/ui/select';

const RouteOptimizer = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Route Optimizer</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Estimated CO2 Savings Today:
          </span>
          <span className="font-bold text-green-600">2.5 kg</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Eco-Friendly Routes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div variants={childVariants} className="space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="text-gray-500" />
              <Input
                placeholder="Enter starting point"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Navigation className="text-gray-500" />
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={transportMode} onValueChange={setTransportMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select transport mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Bus className="w-4 h-4" />
                    <span>Public Transport</span>
                  </div>
                </SelectItem>
                <SelectItem value="car">
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4" />
                    <span>Car</span>
                  </div>
                </SelectItem>
                <SelectItem value="train">
                  <div className="flex items-center space-x-2">
                    <Train className="w-4 h-4" />
                    <span>Train</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">Find Routes</Button>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Recommended Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Estimated Time:</span>
                <span className="font-bold">25 mins</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CO2 Emissions:</span>
                <span className="font-bold text-green-600">0.5 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Distance:</span>
                <span className="font-bold">5.2 km</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alternative Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((route) => (
                <div
                  key={route}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>Route {route}</span>
                    <span className="text-sm text-gray-500">30 mins</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Via Main Street - 6.1 km
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>

    
  );
};

export default RouteOptimizer;