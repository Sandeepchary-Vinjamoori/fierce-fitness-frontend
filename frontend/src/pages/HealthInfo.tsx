import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { HealthInfo, ActivityLevel } from '@/types/health';
import { Loader2, Save, Heart, Activity, Weight, Ruler, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import LoadingAnimation from '@/components/LoadingAnimation';
import { healthInfoApi } from '@/api/apiClient';

const formSchema = z.object({
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  age: z.string().min(1, 'Age is required'),
  currentHealthCondition: z.string().optional(),
  previousHealthConditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  fitnessGoals: z.string().optional(),
  activityLevel: z.string().min(1, 'Activity level is required'),
});

const HealthInfoPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: '',
      weight: '',
      age: '',
      currentHealthCondition: '',
      previousHealthConditions: '',
      allergies: '',
      medications: '',
      fitnessGoals: '',
      activityLevel: 'moderate',
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth', { state: { from: { pathname: '/health-info' } } });
    } else if (user) {
      fetchHealthInfo();
    }
  }, [user, isLoading, navigate]);

  const fetchHealthInfo = async () => {
    if (!user) return;
    
    try {
      setIsLoadingData(true);
      const { data, error } = await healthInfoApi.getHealthInfo();

      if (error) {
        console.error('Error fetching health info:', error);
        return;
      }

      if (data) {
        form.reset({
          height: data.height || '',
          weight: data.weight || '',
          age: data.age || '',
          currentHealthCondition: data.currentHealthCondition || '',
          previousHealthConditions: data.previousHealthConditions || '',
          allergies: data.allergies || '',
          medications: data.medications || '',
          fitnessGoals: data.fitnessGoals || '',
          activityLevel: data.activityLevel || 'moderate',
        });
      }
    } catch (error) {
      console.error('Error fetching health info:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await healthInfoApi.saveHealthInfo(values);

      if (error) {
        throw new Error(error);
      }

      toast({
        title: "Health information saved",
        description: "Your health information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to save",
        description: error.message || "There was an error saving your health information.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="pt-32 px-4">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 pt-32">
        <div className="mb-8">
          <h1 className="section-heading mb-4">
            My <span className="text-gold">Health Information</span>
          </h1>
          <p className="text-white/70 text-lg max-w-3xl">
            Please provide your health details to help us customize your fitness journey.
            This information is private and will only be used to create personalized recommendations.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-panel p-8 rounded-lg">
          {isLoadingData ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gold mb-4" />
              <p className="text-white/80">Fetching your health information...</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Ruler className="h-4 w-4 mr-2 text-gold" />
                          Height (cm)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="175" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Weight className="h-4 w-4 mr-2 text-gold" />
                          Weight (kg)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-gold" />
                        Activity Level
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-dark px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="sedentary">Sedentary (little to no exercise)</option>
                          <option value="light">Light (light exercise 1-3 days/week)</option>
                          <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                          <option value="active">Active (hard exercise 6-7 days/week)</option>
                          <option value="very-active">Very Active (very hard exercise & physical job)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currentHealthCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-gold" />
                        Current Health Condition
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your current health condition"
                          className="bg-dark"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-white/60">
                        Include any ongoing health concerns or conditions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="previousHealthConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-gold" />
                        Previous Health Conditions
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any previous health conditions"
                          className="bg-dark"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any allergies"
                            className="bg-dark"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medications</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List current medications"
                            className="bg-dark"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="fitnessGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fitness Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your fitness goals"
                          className="bg-dark"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-white/60">
                        What do you want to achieve with your fitness journey?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold/90 text-dark" 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Health Information
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};

export default HealthInfoPage;
