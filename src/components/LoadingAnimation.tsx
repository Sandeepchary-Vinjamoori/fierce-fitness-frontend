
import { Dumbbell } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark z-50">
      <div className="relative">
        <Dumbbell size={50} className="text-gold animate-pulse" />
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-scarlet rounded-full animate-ping" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-gold">Finding Your Perfect Trainer</h3>
      <p className="mt-2 text-white/60">Analyzing your goals for the best match...</p>
      
      <div className="mt-8 w-64 h-2 bg-dark-300 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-gold to-scarlet animate-[loading_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

export default LoadingAnimation;
