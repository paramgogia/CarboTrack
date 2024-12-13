import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../@/components/ui/alert';

import { Input } from '../@/components/ui/input';
import { 
  Car, 
  ShoppingBag, 
  Zap, 
  Leaf, 
  Award, 
  TrendingUp,
  Timer,
  Factory,
  AlertTriangle
} from 'lucide-react';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
// const randomCode = () => {
//   const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
//   const randomObject = randomArray.reduce((acc, num, index) => {
//     acc[`key${index}`] = num;
//     return acc;
//   }, {});

//   const randomFunction = (num) => {
//     return num * 2;
//   };

//   const randomString = "This is a random string for demonstration purposes.";

//   console.log("Random Array:", randomArray);
//   console.log("Random Object:", randomObject);
//   console.log("Random String:", randomString);

//   const transformedArray = randomArray.map(randomFunction);
//   console.log("Transformed Array:", transformedArray);

//   return {
//     randomArray,
//     randomObject,
//     randomString,
//     transformedArray
//   };
// };

// const randomData = randomCode();
// console.log("Random Data:", randomData);
// Categories for energy appliances
const CATEGORIES = {
  'Major Appliances': ['Refrigerator', 'Washing Machine', 'Dryer', 'Dishwasher', 'Microwave Oven', 
    'Conventional Oven / Range', 'Air Conditioner', 'Heater', 'Water Heater / Geyser', 'Vacuum Cleaner'],
  'Small Kitchen Appliances': ['Blender / Mixer Grinder', 'Food Processor', 'Toaster / Toaster Oven', 
    'Coffee Maker', 'Electric Kettle', 'Rice Cooker', 'Slow Cooker', 'Pressure Cooker (Electric)', 
    'Juicer', 'Sandwich Maker', 'Air Fryer', 'Deep Fryer', 'Ice Maker'],
  'Home Entertainment': ['Television (TV)', 'Sound System / Speaker System', 'Home Theater System', 
    'DVD / Blu-ray Player', 'Gaming Console'],
  'Personal Care Appliances': ['Hair Dryer', 'Electric Shaver / Trimmer', 'Straightener / Curling Iron', 
    'Electric Toothbrush'],
  'Lighting Accessories': ['LED / CFL Bulbs', 'Tube Lights', 'Table / Desk Lamps', 
    'Ceiling Fans with Lights', 'Chandeliers', 'Outdoor Security Lights'],
  'Home Maintenance': ['Iron / Garment Steamer', 'Electric Broom', 'Carpet Cleaner', 
    'Air Purifier', 'Dehumidifier / Humidifier'],
  'Smart Home Devices': ['Smart Doorbell / Camera', 'Smart Thermostat', 'Smart Plug / Outlet', 
    'Smart Speaker', 'Smart Lights / Bulbs', 'Smart Lock'],
  'Electrical Accessories': ['Power Strip / Extension Cord', 'Adapters and Converters', 
    'Sockets / Switchboards', 'USB Chargers', 'Voltage Stabilizer', 'Surge Protector', 'Timer Switches'],
  'Kitchen Accessories': ['Electric Can Opener', 'Electric Knife', 'Hand Mixer', 
    'Popcorn Maker', 'Electric Griddle']
};

// Energy consumption data in kWh per hour for each appliance
const ENERGY_CONSUMPTION = {
  'Refrigerator': 0.4,
  'Washing Machine': 0.5,
  'Dryer': 3.0,
  'Dishwasher': 1.2,
  'Microwave Oven': 1.2,
  'Conventional Oven / Range': 2.3,
  'Air Conditioner': 3.5,
  'Heater': 2.0,
  'Water Heater / Geyser': 4.5,
  'Vacuum Cleaner': 0.65,
  'Blender / Mixer Grinder': 0.4,
  'Food Processor': 0.36,
  'Toaster / Toaster Oven': 1.1,
  'Coffee Maker': 0.8,
  'Electric Kettle': 1.5,
  'Rice Cooker': 0.6,
  'Slow Cooker': 0.2,
  'Television (TV)': 0.1,
  'Sound System / Speaker System': 0.05,
  'Home Theater System': 0.3,
  'Gaming Console': 0.15,
  'Hair Dryer': 1.8,
  'Electric Shaver / Trimmer': 0.015,
  'LED / CFL Bulbs': 0.01,
  'Tube Lights': 0.04,
  'Ceiling Fans with Lights': 0.075,
  'Iron / Garment Steamer': 1.1,
  'Air Purifier': 0.05,
  'Smart Doorbell / Camera': 0.005,
  'Smart Thermostat': 0.005,
  'Smart Speaker': 0.003,
  'Smart Lights / Bulbs': 0.009
};
// Daily carbon limit in kg CO2
const DAILY_CARBON_LIMIT = 6.8;

// ApplianceCard component with warning system
const ApplianceCard = ({ name, isOn, duration, onToggle, onDurationChange, isOverLimit }) => {
  const energyConsumption = ENERGY_CONSUMPTION[name] || 0;
  const CARBON_INTENSITY = 0.42; // kg CO2 per kWh
  const carbonFootprint = (energyConsumption * duration * CARBON_INTENSITY).toFixed(2);

  return (
    <Card className={`w-full ${isOverLimit ? 'border-red-500' : ''}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            {name}
          </span>
        </CardTitle>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-500">{isOn ? 'Online' : 'Offline'}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Duration (hours)</span>
            <Input 
              type="number" 
              value={duration} 
              onChange={(e) => onDurationChange(e.target.value)}
              className={`w-24 text-right ${isOverLimit ? 'border-red-500' : ''}`}
              min="0"
              max="24"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Status</span>
            <div 
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                isOn 
                  ? 'dark:bg-blue-500 bg-black' 
                  : 'bg-gray-200'
              }`}
              onClick={onToggle}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  isOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
          {isOn && duration > 0 && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">Carbon Footprint</span>
              <span className={`text-sm font-medium ${isOverLimit ? 'text-red-500' : ''}`}>
                {carbonFootprint} kg CO₂
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EcoCenter = () => {
  // State for transport and shopping mock data
  const mockData = {
    transport: [
      { month: 'Jan', emissions: 120 },
      { month: 'Feb', emissions: 100 },
      { month: 'Mar', emissions: 90 },
      { month: 'Apr', emissions: 85 },
    ],
    shopping: [
      { month: 'Jan', sustainable: 5, regular: 8 },
      { month: 'Feb', sustainable: 7, regular: 6 },
      { month: 'Mar', sustainable: 9, regular: 4 },
      { month: 'Apr', sustainable: 12, regular: 3 },
    ]
  };


  // State for energy appliances
  const [searchTerm, setSearchTerm] = useState('');
  const [appliances, setAppliances] = useState(() => {
    const initial = {};
    Object.values(CATEGORIES).flat().forEach(appliance => {
      initial[appliance] = {
        isOn: false,
        duration: 0
      };
    });
    return initial;
  });

   // Calculate total carbon emissions and check if over limit
   const { totalEmissions, isOverLimit } = useMemo(() => {
    const CARBON_INTENSITY = 0.42; // kg CO2 per kWh
    
    let total = 0;
    Object.entries(appliances).forEach(([name, data]) => {
      if (data.isOn && ENERGY_CONSUMPTION[name]) {
        total += ENERGY_CONSUMPTION[name] * data.duration * CARBON_INTENSITY;
      }
    });
    
    return {
      totalEmissions: total.toFixed(2),
      isOverLimit: total > DAILY_CARBON_LIMIT
    };
  }, [appliances]);
  // Calculate total carbon emissions
  const calculateEmissions = useMemo(() => {
    const CARBON_INTENSITY = 0.42; // kg CO2 per kWh
    
    let totalEmissions = 0;
    Object.entries(appliances).forEach(([name, data]) => {
      if (data.isOn && ENERGY_CONSUMPTION[name]) {
        totalEmissions += ENERGY_CONSUMPTION[name] * data.duration * CARBON_INTENSITY;
      }
    });
    
    return totalEmissions.toFixed(2);
  }, [appliances]);
  

 
  // Get all appliances as an array of entries
  const allAppliances = Object.entries(appliances);
  
  // Filter appliances based on search term
  const filteredAppliances = allAppliances.filter(([name]) => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display first 9 appliances if no search term, otherwise show all filtered results
  const displayedAppliances = searchTerm 
    ? filteredAppliances 
    : allAppliances.slice(0, 9);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Handlers for appliance controls
  const handleToggle = (applianceName) => {
    setAppliances(prev => ({
      ...prev,
      [applianceName]: {
        ...prev[applianceName],
        isOn: !prev[applianceName].isOn
      }
    }));
  };

  const handleDurationChange = (applianceName, value) => {
    setAppliances(prev => ({
      ...prev,
      [applianceName]: {
        ...prev[applianceName],
        duration: value
      }
    }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container py-8 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800"
    >
      

      <Tabs defaultValue="energy" className="space-y-8">
        <TabsContent value="energy">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-500" />
                Current Energy Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isOverLimit ? 'text-red-500' : ''}`}>
                {totalEmissions} kg CO₂
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      isOverLimit ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((totalEmissions / DAILY_CARBON_LIMIT) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-sm whitespace-nowrap">
                  {DAILY_CARBON_LIMIT} kg limit
                </span>
              </div>

              {isOverLimit && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Carbon Limit Exceeded</AlertTitle>
                  <AlertDescription>
                    Your current usage exceeds the daily limit of {DAILY_CARBON_LIMIT} kg CO₂. 
                    Consider reducing appliance usage or duration.
                  </AlertDescription>
                </Alert>
              )}

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Active Appliances Breakdown:</h3>
                <div className="space-y-2">
                  {Object.entries(appliances)
                    .filter(([name, data]) => data.isOn && data.duration > 0)
                    .map(([name, data]) => {
                      const emissions = (ENERGY_CONSUMPTION[name] || 0) * data.duration * 0.42;
                      return (
                        <div key={name} className="flex justify-between text-sm">
                          <span>{name} ({data.duration}h)</span>
                          <span className={`font-medium ${isOverLimit ? 'text-red-500' : ''}`}>
                            {emissions.toFixed(2)} kg CO₂
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-full max-w-md mx-auto mb-6">
            <Input
              type="search"
              placeholder="Search appliances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedAppliances.map(([name, data]) => (
              <ApplianceCard
                key={name}
                name={name}
                isOn={data.isOn}
                duration={data.duration}
                onToggle={() => handleToggle(name)}
                onDurationChange={(value) => handleDurationChange(name, value)}
                isOverLimit={isOverLimit}
              />
            ))}
          </div>

          {searchTerm && filteredAppliances.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appliances found matching "{searchTerm}"
            </div>
          )}
        </TabsContent>
   

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="text-green-500" />
                    Total Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">-2.5 tons CO₂</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your total carbon reduction
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-purple-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sustainability badges earned
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-blue-500" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">85%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Towards your yearly goal
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="text-red-500" />
                    Last Month's Energy Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{calculateEmissions} kg CO₂</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your appliance usage
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="transport">
          <Card>
            <CardHeader>
              <CardTitle>Transport Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockData.transport}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shopping">
          <Card>
            <CardHeader>
              <CardTitle>Shopping Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockData.shopping}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sustainable" fill="#22c55e" />
                  <Bar dataKey="regular" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-500" />
                Current Energy Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateEmissions} kg CO₂</div>
              <p className="text-sm text-muted-foreground mt-2">
                Estimated monthly carbon emissions based on current appliance usage
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Active Appliances Breakdown:</h3>
                <div className="space-y-2">
                  {Object.entries(appliances)
                    .filter(([name, data]) => data.isOn && data.duration > 0)
                    .map(([name, data]) => {
                      const emissions = (ENERGY_CONSUMPTION[name] || 0) * data.duration * 0.42;
                      return (
                        <div key={name} className="flex justify-between text-sm">
                          <span>{name} ({data.duration}h)</span>
                          <span className="font-medium">{emissions.toFixed(2)} kg CO₂</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-full max-w-md mx-auto mb-6">
            <Input
              type="search"
              placeholder="Search appliances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedAppliances.map(([name, data]) => (
              <ApplianceCard
                key={name}
                name={name}
                isOn={data.isOn}
                duration={data.duration}
                onToggle={() => handleToggle(name)}
                onDurationChange={(value) => handleDurationChange(name, value)}
              />
            ))}
          </div>

          {searchTerm && filteredAppliances.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appliances found matching "{searchTerm}"
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default EcoCenter;