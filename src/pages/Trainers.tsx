
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TrainersList from '@/components/TrainersList';
import TrainerFilters from '@/components/TrainerFilters';
import TrainerSearch from '@/components/TrainerSearch';
import { Trainer } from '@/types/trainer';
import LoadingAnimation from '@/components/LoadingAnimation';

const Trainers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const location = useLocation();
  
  useEffect(() => {
    // Extract goals from location state if available
    if (location.state && location.state.goals) {
      setSelectedGoals(location.state.goals);
    }
    
    // Simulate loading for a premium experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="section-heading mb-4">
              Elite <span className="text-gold">Trainers</span>
            </h1>
            <p className="text-white/70 text-lg max-w-3xl">
              {selectedGoals.length > 0 ? (
                <>Discover our elite trainers specialized in {selectedGoals.join(', ')}.</>
              ) : (
                <>Discover our elite trainers ready to transform your fitness journey.</>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <TrainerFilters />
            </div>
            
            <div className="lg:col-span-3">
              <TrainerSearch />
              <TrainersList selectedGoals={selectedGoals} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Trainers;
