
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Timer, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type BookingProps = {
  booking: {
    id: string;
    trainerName: string;
    trainerImage: string;
    specialty: string;
    plan: string;
    startDate: string;
    endDate: string;
    nextSession: string;
    canUpgrade: boolean;
  };
  selectedBooking: string | null;
  setSelectedBooking: (id: string | null) => void;
  upgradeOptions: Record<string, { duration: string; price: number; savingsPercentage: number }[]>;
};

const BookingCard = ({ booking, selectedBooking, setSelectedBooking, upgradeOptions }: BookingProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = (bookingId: string, plan: string) => {
    toast({
      title: "Upgrade Started",
      description: `You're upgrading to the ${plan}. Redirecting to checkout...`,
    });
    
    setTimeout(() => {
      navigate('/checkout', { 
        state: { 
          isUpgrade: true,
          originalBookingId: bookingId,
          upgradePlan: plan,
        } 
      });
    }, 1500);
  };

  return (
    <div className="glass-panel overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-3/5">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img 
                src={booking.trainerImage} 
                alt={booking.trainerName} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{booking.trainerName}</h3>
              <p className="text-gold">{booking.specialty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Calendar size={18} className="text-gold mt-1 mr-2" />
              <div>
                <p className="text-white/70 text-sm">Plan Duration</p>
                <p className="font-medium">{booking.plan}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Timer size={18} className="text-gold mt-1 mr-2" />
              <div>
                <p className="text-white/70 text-sm">Next Session</p>
                <p className="font-medium">{booking.nextSession}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User size={18} className="text-gold mt-1 mr-2" />
              <div>
                <p className="text-white/70 text-sm">Sessions Completed</p>
                <p className="font-medium">3 of 12</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 text-sm"
            >
              View Schedule
            </Button>
            
            <Button 
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 text-sm"
            >
              Contact Trainer
            </Button>
            
            {booking.canUpgrade && (
              <Button 
                onClick={() => setSelectedBooking(booking.id)}
                className="bg-gold hover:bg-gold-light text-dark text-sm font-bold"
              >
                Upgrade Plan
              </Button>
            )}
          </div>
        </div>
        
        {selectedBooking === booking.id && booking.plan !== "1 Year Plan" && (
          <div className="bg-dark-200 p-6 md:w-2/5 border-t md:border-t-0 md:border-l border-dark-300">
            <h4 className="font-bold mb-4">Upgrade Your Plan</h4>
            <div className="space-y-3">
              {(upgradeOptions as any)[booking.plan].map((option: any, idx: number) => (
                <div key={idx} className="p-3 bg-dark-100 rounded-lg border border-dark-300 hover:border-gold/30 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{option.duration}</p>
                    <p className="text-green-400 text-sm">{option.savingsPercentage}% off</p>
                  </div>
                  <Button 
                    onClick={() => handleUpgrade(booking.id, option.duration)}
                    className="w-full bg-gold hover:bg-gold-light text-dark text-sm font-bold"
                    size="sm"
                  >
                    Upgrade
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="mt-2 text-white/60 text-sm w-full"
              onClick={() => setSelectedBooking(null)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
