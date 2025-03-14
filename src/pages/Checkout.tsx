
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckoutData } from '@/types/trainer';
import Navbar from '@/components/Navbar';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import BookingSummary from '@/components/checkout/BookingSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, profile, isLoading: authLoading } = useAuth();
  
  // Get trainer data from location state or redirect
  const checkoutData = location.state as CheckoutData;
  
  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;
    
    // If no user, redirect to auth page
    if (!user) {
      navigate('/auth', { state: { from: location } });
      return;
    }
    
    // If no checkout data, redirect to trainers page
    if (!checkoutData?.trainer) {
      toast({
        title: "Missing selection",
        description: "Please select a trainer before proceeding to checkout.",
        variant: "destructive",
      });
      navigate('/trainers');
      return;
    }
    
    setIsPageLoading(false);
  }, [user, checkoutData, navigate, location, authLoading, toast]);
  
  // Handle payment processing state
  const handlePaymentStart = () => setIsProcessing(true);
  const handlePaymentEnd = () => setIsProcessing(false);
  
  // If still loading or no data, show loading animation
  if (isPageLoading || authLoading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <LoadingAnimation />
        </div>
      </div>
    );
  }
  
  // At this point, we should have both a user and checkout data
  const { trainer, selectedDay, selectedTime } = checkoutData;

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      {isProcessing ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <LoadingAnimation />
        </div>
      ) : (
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="section-heading mb-4">
              Complete Your <span className="text-gold">Booking</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Booking Summary */}
              <div className="md:col-span-2">
                <BookingSummary 
                  trainer={trainer} 
                  selectedDay={selectedDay} 
                  selectedTime={selectedTime} 
                />
              </div>
              
              {/* Checkout Form */}
              <div className="md:col-span-3">
                <CheckoutForm 
                  userEmail={user?.email}
                  profile={profile}
                  price={trainer.price}
                  onSubmitStart={handlePaymentStart}
                  onSubmitEnd={handlePaymentEnd}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Checkout;
