
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const EmptyDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="glass-panel p-8 text-center">
      <h3 className="text-xl font-bold mb-4">No active plans</h3>
      <p className="text-white/70 mb-6">Select a trainer to start training</p>
      <Button 
        onClick={() => navigate('/goals')}
        className="bg-gold hover:bg-gold-light text-dark font-bold"
      >
        Choose Your Goal
        <ArrowUpRight size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default EmptyDashboard;
