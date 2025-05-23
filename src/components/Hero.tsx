
import { Link } from 'react-router-dom';
import AnimatedModel from './AnimatedModel';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,30,58,0.08)_0%,transparent_70%)] z-0"></div>
      
      {/* Lion Animation/Image */}
      <AnimatedModel />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge/Pill */}
          <div 
            className="inline-block px-4 py-1 mb-6 rounded-full bg-dark-200/80 backdrop-blur-sm border border-gold/30 
            text-gold text-sm font-medium animate-fade-in shadow-lg"
            style={{ animationDelay: '0.2s' }}
          >
            PREMIUM FITNESS EXPERIENCE
          </div>
          
          {/* Main Heading with text shadow for better readability */}
          <h1 
            className="section-heading mb-4 animate-slide-up text-shadow-lg"
            style={{ animationDelay: '0.4s', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          >
            Train Like a <span className="text-gold inline-block">Warrior</span>, <br />
            Rule Like a <span className="text-scarlet inline-block">King!</span>
          </h1>
          
          {/* Subheading with subtle backdrop for better readability */}
          <p 
            className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up backdrop-blur-[2px] py-2"
            style={{ animationDelay: '0.6s', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
          >
            Elite Trainers. Personalized Plans. Unstoppable Results.
          </p>
          
          {/* Call to Action */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Link 
              to="/goals" 
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Get Started
              <ChevronRight className="transition-transform group-hover:translate-x-1" size={20} />
            </Link>
            <Link 
              to={user ? "/dashboard" : "/auth"} 
              className="text-white border border-white/20 hover:border-white/40 font-bold py-4 px-8 rounded-md 
              transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
            >
              {user ? "My Dashboard" : "Sign Up"}
            </Link>
          </div>
          
          {/* Stats with enhanced visibility */}
          <div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 animate-slide-up"
            style={{ animationDelay: '1s' }}
          >
            <div className="text-center glass-panel py-3 px-4">
              <div className="text-gold text-4xl font-bold mb-1">10k+</div>
              <div className="text-white/80 text-sm">Active Members</div>
            </div>
            <div className="text-center glass-panel py-3 px-4">
              <div className="text-gold text-4xl font-bold mb-1">95%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
            <div className="text-center glass-panel py-3 px-4 col-span-2 md:col-span-1">
              <div className="text-gold text-4xl font-bold mb-1">50+</div>
              <div className="text-white/80 text-sm">Elite Trainers</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-0.5 h-12 bg-gradient-to-b from-gold/0 to-gold/50 rounded mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;
