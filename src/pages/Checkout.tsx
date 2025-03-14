
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckoutData } from '@/types/trainer';
import Navbar from '@/components/Navbar';
import { z } from "zod";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoadingAnimation from '@/components/LoadingAnimation';
import { useAuth } from '@/contexts/AuthContext';

// Form validation schema for checkout
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
});

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
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
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.full_name || "",
      email: user?.email || "",
      phoneNumber: profile?.phone_number || "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!stripe || !elements) {
      toast({
        title: "Payment processing unavailable",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Process payment
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }
      
      // In a real app, you would create a payment intent on your backend
      // This is just a simulation for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save booking information
      // In a real app, this would call your backend API via Supabase
      console.log("Booking information:", {
        trainer,
        selectedDay,
        selectedTime,
        user: values,
      });
      
      // Success - navigate to success page or dashboard
      toast({
        title: "Payment successful!",
        description: "Your training session has been booked.",
      });
      
      // Navigate to dashboard (or success page)
      navigate('/dashboard');
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
                <div className="glass-panel p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{trainer.name}</h3>
                      <p className="text-gold text-sm">{trainer.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-white/70">Date:</span>
                      <span className="font-medium">{selectedDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Session:</span>
                      <span className="font-medium">1 hour</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-dark-300 pt-4 mb-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-gold">${trainer.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Checkout Form */}
              <div className="md:col-span-3">
                <div className="glass-panel p-6">
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                className="bg-dark-200 border-dark-300 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your email" 
                                type="email" 
                                {...field}
                                className="bg-dark-200 border-dark-300 text-white"
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your phone number" 
                                {...field}
                                className="bg-dark-200 border-dark-300 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Payment Details</h3>
                        <div className="p-4 bg-dark-200 rounded-md">
                          <CardElement options={{
                            style: {
                              base: {
                                fontSize: '16px',
                                color: '#ffffff',
                                '::placeholder': {
                                  color: 'rgba(255, 255, 255, 0.5)',
                                },
                              },
                              invalid: {
                                color: '#ff5555',
                              },
                            },
                          }} />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gold hover:bg-gold-light text-dark font-bold py-3"
                        disabled={!stripe || isProcessing}
                      >
                        {isProcessing ? "Processing..." : `Complete Booking ($${trainer.price})`}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Checkout;
