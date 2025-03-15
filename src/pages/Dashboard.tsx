
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveBookings from '@/components/dashboard/ActiveBookings';
import EmptyDashboard from '@/components/dashboard/EmptyDashboard';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import { mockBookings, upgradeOptions } from '@/components/dashboard/DashboardData';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();

  console.log("Dashboard render - Auth status:", { user: !!user, authLoading, profileLoaded: !!profile });

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) {
      console.log("Dashboard: Auth is still loading");
      return;
    }

    console.log("Dashboard: Auth loaded, user:", !!user);

    // If no user, redirect to auth page
    if (!user) {
      console.log("Dashboard: No user, redirecting to auth");
      navigate('/auth', { state: { from: { pathname: '/dashboard' } } });
      return;
    }

    // In a real app, fetch bookings from database
    // For now, use mock data
    const fetchBookings = () => {
      console.log("Dashboard: Fetching bookings");
      // Simulate API call with timeout
      setTimeout(() => {
        setBookings(mockBookings);
        setIsLoading(false);
        console.log("Dashboard: Bookings loaded");
      }, 1000);
    };

    fetchBookings();
  }, [user, authLoading, navigate]);

  // If still loading auth, show simple message
  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <LoadingAnimation />
          <p className="mt-4 text-white/70">Fetching your details...</p>
        </div>
      </div>
    );
  }

  // If user data is loaded but bookings are still loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="section-heading mb-6">
              Your <span className="text-gold">Dashboard</span>
            </h1>
            <DashboardSkeleton />
          </div>
        </main>
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
            <EmptyDashboard />
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
                <ActiveBookings bookings={bookings} upgradeOptions={upgradeOptions} />
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
