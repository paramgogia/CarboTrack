import React, { useState, useEffect } from 'react';
import { Car, Home, Sandwich, ShoppingBag, Droplet, Users, Package, Building, Heart, Info, TreeDeciduous, Flame } from 'lucide-react';
import { Alert, AlertDescription } from '../@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';

// EPA and IPCC-based conversion factors
const categories = [
  {
    id: 'transportation',
    title: 'Transportation',
    icon: Car,
    info: 'Based on EPA emissions standards for average vehicle efficiency',
    questions: [
      { id: 'carMiles', label: 'Miles driven by car per week', factor: 0.404, source: 'EPA average vehicle emissions' }, // kg CO2 per mile
      { id: 'flightHours', label: 'Hours of flight travel per year', factor: 90, source: 'IPCC aviation metrics' }, // kg CO2 per hour
      { id: 'publicTransport', label: 'Public transport trips per week', factor: 2.61, source: 'European Environment Agency' } // kg CO2 per trip
    ]
  },
  
  {
    id: 'energyUse',
    title: 'Energy Use',
    icon: Flame,
    info: 'Based on national averages for energy consumption and production sources',
    questions: [
      { id: 'electricityUsage', label: 'kWh of electricity used per month', factor: 0.92, source: 'U.S. EPA average electricity emissions' },
      { id: 'gasHeating', label: 'Cubic meters of natural gas used per month', factor: 2.03, source: 'EPA natural gas emissions' },
      { id: 'waterHeating', label: 'Gallons of water heated per month', factor: 0.18, source: 'Energy Information Administration' }
    ]
  },
  {
    id: 'foodConsumption',
    title: 'Food Consumption',
    icon: Sandwich,
    info: 'Emissions based on dietary choices and food production methods',
    questions: [
      { id: 'meatMeals', label: 'Meat-based meals per week', factor: 7.2, source: 'FAO livestock emissions' },
      { id: 'vegetarianMeals', label: 'Vegetarian meals per week', factor: 2.0, source: 'UNEP diet study' },
      { id: 'foodWaste', label: 'Food waste in pounds per week', factor: 2.5, source: 'U.S. EPA waste study' }
    ]
  },
  {
    id: 'wasteManagement',
    title: 'Waste Management',
    icon: Package,
    info: 'Includes landfill emissions and waste disposal methods',
    questions: [
      { id: 'landfillWaste', label: 'Pounds of waste sent to landfill per week', factor: 1.98, source: 'EPA landfill methane emissions' },
      { id: 'recycledWaste', label: 'Pounds of recycled waste per week', factor: 0.5, source: 'Recycling impact study' },
      { id: 'composting', label: 'Pounds of composted organic waste per week', factor: 0.7, source: 'EPA composting study' }
    ]
  },
  {
    id: 'waterUsage',
    title: 'Water Usage',
    icon: Droplet,
    info: 'Energy required for water extraction, treatment, and heating',
    questions: [
      { id: 'showerTime', label: 'Minutes spent in shower per day', factor: 0.01, source: 'EPA water heating data' },
      { id: 'laundryLoads', label: 'Laundry loads per week', factor: 1.2, source: 'Energy efficiency reports' },
      { id: 'dishwashing', label: 'Dishwasher loads per week', factor: 0.9, source: 'Energy Star reports' }
    ]
  },
  {
    id: 'socialActivities',
    title: 'Social Activities',
    icon: Users,
    info: 'Carbon footprint from recreational and entertainment activities',
    questions: [
      { id: 'streamingHours', label: 'Hours of streaming content per week', factor: 0.05, source: 'Digital energy consumption study' },
      { id: 'restaurantVisits', label: 'Restaurant meals per month', factor: 10, source: 'Food service emissions data' },
      { id: 'concertsEvents', label: 'Live event attendances per year', factor: 20, source: 'Event industry emissions report' }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping & Online Purchases',
    icon: ShoppingBag,
    info: 'Emissions related to purchasing and shipping of products',
    questions: [
      { id: 'onlineOrders', label: 'Online purchases per month', factor: 5, source: 'Logistics carbon emissions study' },
      { id: 'inStorePurchases', label: 'In-store purchases per month', factor: 3, source: 'Retail energy report' },
      { id: 'packagingWaste', label: 'Pounds of packaging waste per month', factor: 2.3, source: 'EPA packaging waste report' }
    ]
  },
  {
    id: 'buildingMaintenance',
    title: 'Building & Home Maintenance',
    icon: Building,
    info: 'Energy use from home improvements and ongoing maintenance',
    questions: [
      { id: 'renovationProjects', label: 'Home renovation projects per year', factor: 500, source: 'Construction carbon study' },
      { id: 'applianceReplacements', label: 'New appliances purchased per year', factor: 150, source: 'Appliance manufacturing emissions' },
      { id: 'energyEfficiency', label: 'Energy-efficient upgrades per year', factor: -100, source: 'Energy conservation data' }
    ]
  },
 
  
  // ... (previous categories remain the same)
];

const equivalencies = [
  { name: 'Smartphones Charged', factor: 0.005, icon: ShoppingBag }, // kg CO2 per charge
  { name: 'Miles Driven', factor: 0.404, icon: Car }, // kg CO2 per mile
  { name: 'Trees Needed (1 year)', factor: 21, icon: TreeDeciduous }, // kg CO2 absorbed per tree per year
  { name: 'Gallons of Gasoline', factor: 8.887, icon: Flame }, // kg CO2 per gallon
];

const CarbonFootprintCalculator = () => {
  const [answers, setAnswers] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [categoryEmissions, setCategoryEmissions] = useState({});
  const [showFormula, setShowFormula] = useState(false);

  const calculateCategoryEmissions = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;

    return category.questions.reduce((acc, question) => {
      const value = answers[categoryId]?.[question.id] || 0;
      return acc + (value * question.factor);
    }, 0);
  };

  useEffect(() => {
    // Calculate emissions for all categories in real-time
    const newCategoryEmissions = {};
    let total = 0;

    categories.forEach(category => {
      const emission = calculateCategoryEmissions(category.id);
      newCategoryEmissions[category.id] = emission;
      total += emission;
    });

    setCategoryEmissions(newCategoryEmissions);
    setTotalEmissions(total);
  }, [answers]);

  const handleInputChange = (categoryId, questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [questionId]: parseFloat(value) || 0
      }
    }));
  };

  const getEquivalencies = (emissions) => {
    return equivalencies.map(eq => ({
      ...eq,
      value: Math.round(emissions / eq.factor)
    }));
  };

  const getEmissionLevel = (emissions) => {
    if (emissions < 1000) return { text: 'Low Impact', color: 'text-green-600', bg: 'bg-green-50' };
    if (emissions < 5000) return { text: 'Moderate Impact', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'High Impact', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Carbon Footprint Calculator
            <button 
              onClick={() => setShowFormula(!showFormula)}
              className="ml-2 p-1 rounded-full hover:bg-gray-100"
            >
              <Info className="w-5 h-5 text-blue-500" />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showFormula && (
            <Alert className="mb-4">
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Calculation Formula (Based on IPCC Guidelines):</p>
                  <p className="font-mono text-sm">
                    Total Emissions = Σ (Activity Data × Emission Factor)
                  </p>
                  <p className="text-sm">
                    Where:
                    <br />
                    - Activity Data = Your input (e.g., miles driven)
                    <br />
                    - Emission Factor = Standard CO₂ equivalent per unit (from EPA/IPCC)
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {!showResults ? (
            <>
              <div className="flex overflow-x-auto mb-6 pb-2 gap-2">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const emission = categoryEmissions[category.id] || 0;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setCurrentCategory(index)}
                      className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-all ${
                        currentCategory === index
                          ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-sm font-medium">{category.title}</span>
                      <span className="text-xs mt-1">{emission.toFixed(1)} kg CO₂</span>
                    </button>
                  );
                })}
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {React.createElement(categories[currentCategory].icon, { className: "w-5 h-5" })}
                      {categories[currentCategory].title}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${getEmissionLevel(categoryEmissions[categories[currentCategory].id] || 0).bg} ${getEmissionLevel(categoryEmissions[categories[currentCategory].id] || 0).color}`}>
                      {(categoryEmissions[categories[currentCategory].id] || 0).toFixed(1)} kg CO₂
                    </span>
                  </div>

                  <div className="space-y-4">
                    {categories[currentCategory].questions.map(question => {
                      const value = answers[categories[currentCategory].id]?.[question.id] || '';
                      const emission = value * question.factor;
                      return (
                        <div key={question.id} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            {question.label}
                          </label>
                          <div className="flex gap-4 items-center">
                            <input
                              type="number"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200"
                              value={value}
                              onChange={(e) => handleInputChange(categories[currentCategory].id, question.id, e.target.value)}
                              min="0"
                              step="0.1"
                            />
                            <span className="text-sm text-gray-500 w-24">
                              {emission.toFixed(1)} kg CO₂
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Source: {question.source}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
                  disabled={currentCategory === 0}
                  className="px-4 py-2 text-blue-600 disabled:opacity-50"
                >
                  Previous
                </button>
                {currentCategory === categories.length - 1 ? (
                  <button
                    onClick={() => setShowResults(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    View Results
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentCategory(currentCategory + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={getEmissionLevel(totalEmissions).bg}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">Total Annual Emissions</h3>
                    <p className={`text-3xl font-bold ${getEmissionLevel(totalEmissions).color}`}>
                      {totalEmissions.toFixed(1)} kg CO₂
                    </p>
                    <p className={`text-sm mt-2 ${getEmissionLevel(totalEmissions).color}`}>
                      {getEmissionLevel(totalEmissions).text}
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  {getEquivalencies(totalEmissions).map((eq, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {React.createElement(eq.icon, { className: "w-4 h-4" })}
                          <h4 className="text-sm font-medium">{eq.name}</h4>
                        </div>
                        <p className="text-2xl font-bold">{eq.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {categories.map(category => {
                  const emission = categoryEmissions[category.id] || 0;
                  const percentage = (emission / totalEmissions) * 100;
                  
                  return (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {React.createElement(category.icon, { className: "w-5 h-5" })}
                            <h3 className="font-medium">{category.title}</h3>
                          </div>
                          <p className="font-bold">{emission.toFixed(1)} kg CO₂</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{percentage.toFixed(1)}% of total</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentCategory(0);
                  setAnswers({});
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Calculate Again
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonFootprintCalculator;