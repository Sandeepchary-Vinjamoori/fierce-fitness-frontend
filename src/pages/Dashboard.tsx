
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, User, Timer, ArrowUpRight } from 'lucide-react';

// Mock data for bookings - in a real app, this would come from your database
const mockBookings = [
  {
    id: "1",
    trainerName: "Alex Rodriguez",
    trainerImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Strength & Conditioning",
    plan: "3 Months Plan",
    startDate: "2023-11-15",
    endDate: "2024-02-15",
    nextSession: "Monday, 10:00 AM",
    canUpgrade: true
  },
  {
    id: "2",
    trainerName: "Sarah Johnson",
    trainerImage: "https://images.unsplash.com/photo-1609899464110-a7caddaef3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Nutrition & Fat Loss",
    plan: "1 Day (Single Session)",
    startDate: "2023-11-20",
    endDate: "2023-11-20",
    nextSession: "Wednesday, 2:00 PM",
    canUpgrade: true
  }
];

// Available upgrade options
const upgradeOptions = {
  "1 Day (Single Session)": [
    { duration: "3 Months Plan", price: 9450, savingsPercentage: 10 },
    { duration: "6 Months Plan", price: 17850, savingsPercentage: 15 },
    { duration: "1 Year Plan", price: 31500, savingsPercentage: 25 }
  ],
  "3 Months Plan": [
    { duration: "6 Months Plan", price: 8925, savingsPercentage: 15 },
    { duration: "1 Year Plan", price: 17850, savingsPercentage: 25 }
  ],
  "6 Months Plan": [
    { duration: "1 Year Plan", price: 11900, savingsPercentage: 25 }
  ],
  "1 Year Plan": []
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // If no user, redirect to auth page
    if (!user) {
      navigate('/auth', { state: { from: { pathname: '/dashboard' } } });
      return;
    }

    // In a real app, fetch bookings from database
    // For now, use mock data
    setBookings(mockBookings);
    setIsLoading(false);
  }, [user, authLoading, navigate]);

  const handleUpgrade = (bookingId: string, plan: string) => {
    // In a real app, this would navigate to a checkout page with the upgrade details
    toast({
      title: "Upgrade Started",
      description: `You're upgrading to the ${plan}. Redirecting to checkout...`,
    });
    
    // Simulate navigation to checkout with upgrade details
    setTimeout(() => {
      navigate('/checkout', { 
        state: { 
          isUpgrade: true,
          originalBookingId: bookingId,
          upgradePlan: plan,
          // Additional details would be included here
        } 
      });
    }, 1500);
  };

  // If still loading, show loading animation
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading mb-6">
            Your <span className="text-gold">Dashboard</span>
          </h1>

          {bookings.length === 0 ? (
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
          ) : (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="w-full mb-6 bg-dark-200 p-1">
                <TabsTrigger value="active" className="flex-1 data-[state=active]:bg-dark-100 data-[state=active]:text-gold">
                  Active Bookings
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1 data-[state=active]:bg-dark-100 data-[state=active]:text-gold">
                  Past Bookings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-0">
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="glass-panel overflow-hidden">
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                <div className="glass-panel p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">No past bookings</h3>
                  <p className="text-white/70">Your completed sessions will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
