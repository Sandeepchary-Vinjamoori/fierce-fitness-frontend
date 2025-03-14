
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/";
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (!error) {
        // Successfully logged in, will be redirected by useEffect
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignup = async (values: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(
        values.email, 
        values.password,
        values.fullName,
        values.phoneNumber
      );
      
      if (!error) {
        // Successfully signed up, will be redirected by useEffect
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-md mx-auto">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              <span className="text-gold">SCARFACE</span> FITNESS
            </h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your password" 
                              type="password" 
                              {...field}
                              className="bg-dark-200 border-dark-300 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gold hover:bg-gold-light text-dark font-bold py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                    
                    <p className="text-center text-sm text-white/60 mt-4">
                      Don't have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => setActiveTab("signup")} 
                        className="text-gold hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
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
                      control={signupForm.control}
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
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
                    
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Create Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Create a password" 
                              type="password" 
                              {...field}
                              className="bg-dark-200 border-dark-300 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-enter Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Re-enter your password" 
                              type="password" 
                              {...field}
                              className="bg-dark-200 border-dark-300 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gold hover:bg-gold-light text-dark font-bold py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                    
                    <p className="text-center text-sm text-white/60 mt-4">
                      Already have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => setActiveTab("login")} 
                        className="text-gold hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
