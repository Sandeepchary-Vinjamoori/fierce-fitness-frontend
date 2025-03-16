
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import LoadingAnimation from '@/components/LoadingAnimation';

const Trainers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Redirect to the Health Info page
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate('/health-info');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 pt-32 text-center">
        <LoadingAnimation />
        <p className="text-white/70 mt-4">Redirecting to My Health Info...</p>
      </div>
    </div>
  );
};

export default Trainers;
