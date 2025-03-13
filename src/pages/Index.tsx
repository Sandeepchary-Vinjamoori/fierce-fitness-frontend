
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import GoalBased from '../components/GoalBased';
import Trainers from '../components/Trainers';

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <GoalBased />
      <Trainers />
      
      {/* Footer */}
      <footer className="bg-dark-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold tracking-wider mb-6">
              <span className="text-gold">SCARFACE</span> FITNESS
            </div>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Transform your body, elevate your mind, and conquer your limits with the most premium fitness experience.
            </p>
            <div className="flex justify-center space-x-8 mb-10">
              <a href="#" className="text-white/60 hover:text-gold transition-colors">Instagram</a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">Facebook</a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">YouTube</a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">Twitter</a>
            </div>
            <div className="text-white/40 text-sm">
              © 2023 Scarface Fitness. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
