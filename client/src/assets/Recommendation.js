import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';
import { Button } from '../@/components/ui/button';
import { Badge } from '../@/components/ui/badge';
import { Lightbulb, ShoppingBag, Car, Leaf } from 'lucide-react';

const Recommendations = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const recommendations = [
    {
      category: 'Energy',
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Switch to LED Bulbs',
      description: 'Replace your traditional bulbs with LED alternatives to save energy.',
      impact: '120kg CO2/year',
      difficulty: 'Easy'
    },
    {
      category: 'Shopping',
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Buy Local Produce',
      description: 'Choose locally sourced products to reduce transportation emissions.',
      impact: '160kg CO2/year',
      difficulty: 'Medium'
    },
    {
      category: 'Transport',
      icon: <Car className="w-6 h-6" />,
      title: 'Use Public Transport',
      description: 'Take the bus or train instead of driving for your daily commute.',
      impact: '200kg CO2/year',
      difficulty: 'Medium'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Personalized Recommendations</h1>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Leaf className="w-4 h-4" />
          Impact Score: 480kg CO2/year
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{recommendation.category}</Badge>
                  {recommendation.icon}
                </div>
                <CardTitle className="text-xl">{recommendation.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {recommendation.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Potential Impact</span>
                    <span className="font-bold text-green-600">{recommendation.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Difficulty</span>
                    <span className="font-medium">{recommendation.difficulty}</span>
                  </div>
                </div>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Zero Waste Week</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try to minimize your waste production for one week
                </p>
              </div>
              <Badge variant="secondary">500 Points</Badge>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: '60%' }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Progress: 60%</span>
              <span>4 days remaining</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Recommendations;