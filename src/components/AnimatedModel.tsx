
import { useEffect, useRef } from 'react';

const AnimatedModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Animation logic for particles would go here
    
    return () => {
      // Cleanup logic
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {/* Lion Image Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[800px] max-h-[800px] opacity-30 transform scale-100 md:scale-110 lg:scale-125 transition-all duration-1000">
          <img 
            src="/lovable-uploads/31e8774b-2997-4e08-a36e-58f615f407f5.png" 
            alt="Fierce Golden Lion" 
            className="w-full h-full object-contain animate-pulse"
            style={{ 
              filter: 'drop-shadow(0 0 20px rgba(226,179,60,0.3))',
              animation: 'pulse 4s infinite alternate'
            }}
          />
          
          {/* Radial gradient overlay to help blend with background */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-dark/80 mix-blend-overlay"></div>
        </div>
      </div>
      
      {/* Animated particles for ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedModel;
