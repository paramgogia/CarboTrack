import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Alert, AlertDescription } from '../@/components/ui/alert';
import NewsCard from './NewsCard';  // Make sure this path is correct
import ImageProcess from './ImageProcess';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import './Dashboard.css'; 
import FootprintCursor from './FootprintCursor';
import landing from '../images/land2.png';

const Dashboard = () => {// Default theme if context is not available
  const { theme } = useTheme();
  const [openSections, setOpenSections] = useState({
    co2: false,
    co2eq: false,
    renewable: false,
    credits: false,
    offsetting: false
  });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sustainability-related search terms
  const searchQueries = [
    'carbon footprint',
    'sustainability',
    'renewable energy',
    'climate change',
    'green technology',
    'environmental impact'
  ];

  const getNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
      const response = await fetch(
        `https://newsapi.org/v2/everything?` +
        `q=${encodeURIComponent(`${randomQuery} AND (science OR health OR Carbon OR Green Energy)`)}&` +
        `language=en&` +
        `sortBy=publishedAt&` +
        `apiKey=294c5ddf4b274ea98ddc8a21d8233a2f`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      
      const validArticles = data.articles.filter(article => 
        article.urlToImage && 
        article.title && 
        article.description &&
        !article.title.includes('[Removed]') &&
        !article.description.includes('[Removed]')
      );

      setNews(validArticles.slice(0, 8));
    } catch (err) {
      setError('Failed to load sustainability news. Please try again later.');
      console.error('News fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
    const interval = setInterval(getNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const learningSections = [
    {
      id: 'co2',
      title: 'CO2',
      content: `Carbon dioxide (CO2) is a greenhouse gas that plays a crucial role in climate change. 
                In the context of computing and ML, CO2 emissions come from the energy used to power 
                and cool data centers, as well as the embodied carbon in hardware manufacturing.`,
      fullWidth: false
    },
    {
      id: 'renewable',
      title: 'Renewable vs. Nonrenewable Energy',
      content: `Renewable energy sources like solar, wind, and hydroelectric power can help reduce 
                the carbon footprint of ML operations. Nonrenewable sources like coal and natural gas 
                contribute significantly to greenhouse gas emissions.`,
      fullWidth: false
    },
    {
      id: 'credits',
      title: 'Renewable Energy Credits',
      content: `Renewable Energy Credits (RECs) are certificates that represent the environmental 
                benefits of generating electricity from renewable sources. Organizations can purchase 
                RECs to offset their energy consumption from non-renewable sources.`,
      fullWidth: false
    },
    {
      id: 'co2eq',
      title: 'CO2 eq.',
      content: `CO2 equivalent (CO2eq) is a metric used to compare emissions from various greenhouse 
                gases based on their global warming potential. This helps in understanding the total 
                climate impact of different activities and technologies.`,
      fullWidth: false
    },
    {
      id: 'offsetting',
      title: 'Carbon Offsetting',
      content: `Carbon offsetting involves compensating for CO2 emissions by funding projects that 
                reduce or capture an equivalent amount of CO2. This can include reforestation, 
                renewable energy projects, or energy efficiency improvements.`,
      fullWidth: false
    },
    {
      id: "carbonefficiency",
      title: "Carbon Efficiency",
      content: "Carbon efficiency: the amount of CO2 emitted per unit energy (grams of CO2 emitted per kilowatt-hour). This is largely related to a country�s energy mix. An economy powered by coal-fired energy will produce higher CO2 emissions per unit of energy versus an energy system with a high percentage of renewable energy. As economies increase their share of renewable capacity, efficiency improves and the amount of CO2 emitted per unit energy falls."
    },
    {
      id: 'maps',
      title: 'Featured Maps',
      fullWidth: true,
      content: (
        <div className="space-y-6">
          <p>
            Here are a few maps from Our World In Data which illustrate the complexity of carbon
            emissions mitigations. For a complete analysis, visit{' '}
            <a
              href="https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              their website
            </a>.
          </p>
          <iframe
            src="https://ourworldindata.org/grapher/co-emissions-per-capita"
            title="CO2 emissions per capita"
            className="w-full h-[600px] border-0"
          />
          <iframe
            src="https://ourworldindata.org/grapher/carbon-dioxide-co2-emissions-by-sector-or-source"
            title="CO2 emissions by sector or source"
            className="w-full h-[600px] border-0"
          />
          <img
            src="https://ourworldindata.org/uploads/2018/04/Greenhouse-gas-emission-scenarios-01.png"
            alt="Greenhouse gas scenarios"
            className="w-full"
          />
        </div>
      )
    }
  ];

  const actionCards = [
    {
      title: 'ECO CENTER',
      text: 'Dive into our Eco Center to discover a wealth of knowledge about eco-friendly practices, sustainable living, and environmental initiatives. Learn how you can contribute to a greener planet through everyday actions and stay updated with the latest in sustainability.',
      icon: '♻️'
    },
    {
      title: 'CALCULATOR',
      text: 'Use our Calculator to estimate your carbon footprint. By analyzing your daily activities, transportation habits, and energy consumption, this tool helps you understand your impact on the environment and offers personalized tips to reduce emissions.',
      icon: '📏'
    },
    {
      title: 'MAP',
      text: 'Explore our interactive Map to locate eco-friendly destinations, recycling centers, green spaces, and community events near you. Plan trips with sustainability in mind, and find places that align with your commitment to the environment.',
      icon: '🗺️'
    },
    {
      title: 'CARPOOL',
      text: 'Join our Carpool initiative to connect with others who are looking to reduce their carbon emissions through shared transportation. Whether for daily commutes or occasional trips, carpooling is a great way to minimize environmental impact while building community connections.',
      icon: '🚗'
    },
    {
      title: 'COMMUNITY',
      text: 'Become part of a growing Community of eco-conscious individuals. Share your experiences, participate in discussions, and collaborate on projects aimed at making a difference. This is your space to inspire and be inspired by others on a sustainable journey.',
      icon: '👥'
    }
  ];

  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const bgColor = theme === 'dark' ? 'bg-navy-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-white bg-opacity-10' : 'bg-white bg-opacity-90';
  const subTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  const renderSection = (section) => (
    <div 
      key={section.id} 
      className={`${section.fullWidth ? 'w-full' : ''}`}
    >
      <button
        onClick={() => toggleSection(section.id)}
        className="group relative w-full text-left"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-2xl ${textColor}`}>{section.title}</span>
          <ChevronDown 
            className={`w-5 h-5 transform transition-transform ${openSections[section.id] ? 'rotate-180' : ''}`} 
          />
        </div>
        <div className={`absolute bottom-0 left-0 w-full ${!section.fullWidth ? 'lg:w-[400px]' : ''} h-0.5 bg-red-500 transform`} />
      </button>
      {openSections[section.id] && (
        <div 
          className={`mt-4 ${subTextColor} ${
            section.fullWidth ? 'w-full col-span-2 lg:col-span-2 -mx-8 px-8' : ''
          }`}
        >
          {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
        </div>
      )}
    </div>
  );
  

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} pb-8`}>
      <FootprintCursor />
      
      {/* Hero Section with Animation */}
      <div className="min-h-full"> 
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex items-center justify-center gap-4 h-fit py-9 w-full relative flex-col sm:flex-row mb-20"
      >
        {/* Text Section */}
        <motion.div 
          variants={itemVariants}
          className="relative items-center max-w-xl top-0 mb-6 sm:mb-0"
        >
          <motion.h1 
              variants={heroTextVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Track Today, 
              <br />
              Sustain Tomorrow.
            </motion.h1>
          
            <motion.h3 
              variants={heroTextVariants}
              className="text-2xl md:text-2xl font-medium mb-8 opacity-90"
            >
              Shrink Your Footprint to Grow Your Impact
            </motion.h3>


          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login">
              <button className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors">
                Get Started
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={imageVariants}
          className="flex flex-shrink-0 w-3/5 sm:w-3/5 md:w-3/5"
        >
          <img src={landing} alt="Landing Image" />
        </motion.div>
      </motion.div>

      {/* News Section with Animation */}
      {/* News Section with Animation */}
<motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="mb-16 px-4 md:px-6 lg:px-8" // Adjusted padding
>
  <h2 className="text-5xl font-medium text-center mb-12">Latest Sustainability News</h2>
  
  {error && (
    <Alert variant="destructive" className="mb-6">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )}

  {loading ? (
    <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  ) : (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto" // Adjusted grid and gap
    >
      {news.map((article, index) => (
        <motion.div
          key={`${article.title}-${index}`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <NewsCard data={article} theme={theme} />
        </motion.div>
      ))}
    </motion.div>
  )}
</motion.div>

      {/* Learn Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-28"
      >
        <h1 className={`text-5xl font-bold text-center mb-6 ${textColor}`}>Learn</h1>
        <p className={`text-center ${subTextColor} mb-24 max-w-3xl mx-auto`}>
          This section will present some of the important concepts to better understand the
          carbon footprint of your ML research, including what providers do to help you offset it
        </p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 lg:gap-y-24"
        >
          {learningSections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={section.fullWidth ? 'col-span-1 lg:col-span-2' : ''}
            >
              {renderSection(section)}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Actions Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={`text-4xl font-bold text-center mb-2 ${textColor}`}>
          There are things you can do
        </h1>
        <p className={`text-center ${subTextColor} mb-12`}>
          With great computing power comes great responsibility
        </p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols- gap-8 max-w-5xl mx-auto"
        >
          {actionCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
              }}
              className={`${cardBg} p-6 rounded-lg flex flex-col`}
            >
              <div className="text-2xl mb-4">{card.icon}</div>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>{card.title}</h3>
              <p className={`${subTextColor} flex-grow`}>{card.text}</p>
              {card.button && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  {card.button}
                </motion.button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;