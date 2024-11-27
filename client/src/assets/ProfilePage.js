import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Badge } from '../@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar';
import { Progress } from '../@/components/ui/progress';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';
import {
  Trophy,
  Medal,
  Target,
  Settings,
  Bell,
  Shield,
  Mail,
  Award,
  User,
  Calendar
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../@/components/ui/tabs';
import { useTheme } from '../context/ThemeContext';

const API_BASE_URL = 'http://localhost:5000/api/auth';


// Rest of the component code remains exactly the same
const Profile = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const bgColor = theme === 'dark' ? 'bg-navy-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-white bg-opacity-10' : 'bg-white bg-opacity-90';
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [carbonData, setCarbonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    // try {
    //   const token = localStorage.getItem('accessToken');
    //   if (!token) {
    //     throw new Error('No access token found');
    //   }

    //   const response = await fetch(`${API_BASE_URL}/user`, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });

      // if (!response.ok) {  
      //   if (response.status === 401) {
      //     // Handle token refresh here if needed
      //     throw new Error('Authentication failed');
      //   }
      //   throw new Error('Failed to fetch user data');
      // }
    //   console.log(response)
    //   const data = await response.json();
     
    //   setUserData(data.user);
    // } catch (err) {
    //   setError(err.message);
    //   console.error('Error fetching user data:', err);
    // } finally {
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  const fetchCarbonData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${API_BASE_URL}/carbon-footprint`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle token refresh here if needed
          throw new Error('Authentication failed');
        }
        throw new Error('Failed to fetch carbon data');
      }

      const data = await response.json();
      
      // Transform the data for the graph
      const formattedData = data.data.monthly.map(item => ({
        month: new Date(item.month).toLocaleString('default', { month: 'short' }),
        footprint: item.total
      }));

      setCarbonData(formattedData);
      setUserData(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching carbon data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarbonData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const achievements = [
    { title: 'Carbon Warrior', description: 'Reduced carbon footprint by 50%', icon: <Trophy /> },
    { title: 'Eco Champion', description: 'Completed 10 eco-challenges', icon: <Medal /> },
    { title: 'Green Influencer', description: 'Inspired 5 friends to join', icon: <Target /> }
  ];
  const calculateReduction = () => {
    if (carbonData.length < 2) return 0;
    const latest = carbonData[carbonData.length - 1].footprint;
    const previous = carbonData[carbonData.length - 2].footprint;
    return ((previous - latest) / previous * 100).toFixed(1);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8`}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Average Monthly Footprint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {userData?.average?.toFixed(1) || 0} kg
              </div>
              <Progress 
                value={Math.min((userData?.average || 0) / 10, 100)} 
                className="mt-2" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Reduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {calculateReduction()}%
              </div>
              <Progress 
                value={Math.abs(calculateReduction())} 
                className="mt-2" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {userData?.total?.toFixed(1) || 0} kg
              </div>
              <Progress 
                value={Math.min((userData?.total || 0) / 100, 100)} 
                className="mt-2" 
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Carbon Footprint Graph */}
        {/* <motion.div variants={itemVariants} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart 
                width={800} 
                height={400} 
                data={carbonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Carbon Footprint (kg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="footprint" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </CardContent>
          </Card>
        </motion.div> */}

      {/* Tabs Section */}
      <div className={`min-h-screen ${bgColor} ${textColor} p-8`}>
        <Tabs defaultValue="dashboard">
          <TabsList className="w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Footprint Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart width={500} height={300} data={carbonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="footprint"
                      stroke="#22c55e"
                      strokeWidth={2}
                    />
                  </LineChart>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <User className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Full Name: test</div>
                        {/* <div className="font-medium">test</div> */}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Email: test@gmail.com</div>
                        {/* <div className="font-medium"> test@gmail.com</div> */}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Award className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Eco Score: 85</div>
                        <div className="font-medium">{userData?.ecoScore}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Member Since: 10-11-24</div>
                        {/* <div className="font-medium">
                          {new Date(userData?.createdAt).toLocaleDateString()}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="p-2 bg-primary/10 rounded-full">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>All Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-500">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    defaultValue="john@example.com"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    defaultValue="********"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notification Preferences</label>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4" />
                      <span>Push Notifications</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Bell className="w-4 h-4" />
                        <div>
                          <h4 className="font-medium">New Challenge Available</h4>
                          <p className="text-sm text-gray-500">
                            Complete the Zero Waste Week challenge
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2h ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </motion.div>
    </div>
  );
};

export default Profile;