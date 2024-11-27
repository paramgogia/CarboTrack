import React from 'react';
import { Link } from 'react-router-dom';
import TechnovateLogo from './TechWizard.png'
import { 
  Activity,
  Heart,
  Github,
  Linkedin,
  Mail,
  BarChart2,
  Droplet,
  Zap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick links mapping with their corresponding routes
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'EcoCenter', path: '/eco-center' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Map', path: '/map' },
    { name: 'Carpool', path: '/carpool' },
    { name: 'Community', path: '/community' },
    { name: 'Shopping', path: '/shopping' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-white border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="bg-gray-900 dark:bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500 font-bold text-lg">
                     <Link to="/" className="flex items-center space-x-2">
          <div className="text-xl font-bold">
            <img
              src={TechnovateLogo}
              alt="Technovate"
              className='h-10 invert dark:invert-0'
            />
          </div>
        </Link>
                </span>
              </div>
              <p className="mt-4 text-white dark:text-black">
                Helping individuals and businesses track and reduce their carbon footprint. 
                Together we can make a difference for our planet.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className=" text-green-500 font-bold text-lg tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white dark:text-black hover:text-green-500 dark:hover:text-green-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-green-500 font-bold text-lg tracking-wider">
                Connect
              </h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-white dark:text-black hover:text-green-500 dark:hover:text-green-600 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-white dark:text-black hover:text-green-500 dark:hover:text-green-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-white dark:text-black hover:text-green-500 dark:hover:text-green-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white dark:text-black text-sm">
                © {currentYear} CarbonTrack. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <span className="text-white dark:text-black text-sm">Made with</span>
                <Heart className="w-4 h-4 text-green-500 dark:text-green-600" />
                <span className="text-white dark:text-black text-sm">for the planet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;