
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Profile } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/api/apiClient';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in using token
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const { data, error } = await authApi.getSession();
        
        if (error || !data) {
          console.error('Session error:', error);
          localStorage.removeItem('token');
          setIsLoading(false);
          return;
        }
        
        setUser(data.user);
        setProfile(data.user.profile);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      setIsLoading(true);
      
      try {
        const { data, error } = await authApi.getSession();
        
        if (error || !data) {
          console.error('Error refreshing profile:', error);
          setIsLoading(false);
          return;
        }
        
        setUser(data.user);
        setProfile(data.user.profile);
      } catch (error) {
        console.error('Error refreshing profile:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phoneNumber: string) => {
    try {
      const { data, error } = await authApi.signUp(email, password, fullName, phoneNumber);

      if (error || !data) {
        toast({
          title: "Sign up failed",
          description: error || "An unexpected error occurred",
          variant: "destructive",
        });
        return { error, data: null };
      }

      // Store the JWT token
      localStorage.setItem('token', data.token);
      
      // Set the user state
      setUser(data.user);
      setProfile(data.user.profile);

      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error, data: null };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await authApi.signIn(email, password);

      if (error || !data) {
        toast({
          title: "Login failed",
          description: error || "An unexpected error occurred",
          variant: "destructive",
        });
        setIsLoading(false);
        return { error, data: null };
      }

      // Store the JWT token
      localStorage.setItem('token', data.token);
      
      // Set the user state
      setUser(data.user);
      setProfile(data.user.profile);

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await authApi.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        toast({
          title: "Error logging out",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
        // Clear user state
        setUser(null);
        setProfile(null);
      }
    } catch (error: any) {
      console.error('Error in signOut function:', error);
      toast({
        title: "Error logging out",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      signUp,
      signIn,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
