import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
// import { Toaster } from '@components/ui/toaster';
import Navbar from './assets/Navbar';
// import Footer from './components/Footer';
import Dashboard from './assets/Dashboard';
import EcoCenter from './assets/EcoCenter';
import ShoppingTracker from './assets/ShoppingTracker';
import Community from './assets/Community';
import RouteOptimizer from './assets/RouteOptimizer';
import Recommendations from './assets/Recommendation';
import Profile from './assets/ProfilePage';
import Login from './assets/Login';
import Register from './assets/Register';
import CarbonFootprintCalculator from './assets/Calculator';
import GeolocationMap from './assets/route';
import RideBooking from './assets/pool';
import FloatingChatButton from './assets/FloatingChatButton'
import Footer from './assets/Footer';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/eco-center" element={<EcoCenter />} />
                <Route path="/shopping" element={<ShoppingTracker />} />
                <Route path="/community" element={<Community />} />
                <Route path="/routes" element={<RouteOptimizer />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/profile" element={<Profile />} />
               <Route path="/calculator" element={<CarbonFootprintCalculator />} />
               <Route path="/map" element={<GeolocationMap />} />
                <Route path="/carpool" element={<RideBooking />} />
              </Routes>
            </main>
            <FloatingChatButton />
            <Footer/>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;