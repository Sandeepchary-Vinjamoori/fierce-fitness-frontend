
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

type CheckoutFormProps = {
  userEmail?: string;
  profile?: Profile | null;
  price: number;
  onSubmitStart: () => void;
  onSubmitEnd: () => void;
};

const CheckoutForm = ({ 
  userEmail, 
  profile, 
  price, 
  onSubmitStart, 
  onSubmitEnd 
}: CheckoutFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { 
      maximumFractionDigits: 0 
    }).format(price);
  };
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.full_name || "",
      email: userEmail || "",
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

    onSubmitStart();
    
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
        user: values,
        price: price
      });
      
      // Success - navigate to dashboard
      toast({
        title: "Payment successful!",
        description: "Your training session has been booked.",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      onSubmitEnd();
    }
  };

  return (
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
            disabled={!stripe}
          >
            {`Complete Booking (₹${formatPrice(price)})`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
