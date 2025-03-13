
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useIsMobile } from '@/hooks/use-mobile';

interface Goal {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
}

const Goals = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const goals: Goal[] = [
    {
      id: 'muscle-gain',
      title: 'Muscle Gain',
      description: 'Build lean muscle mass and develop a stronger, more defined physique.',
      image: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accent: 'from-gold/80 to-gold-dark/40'
    },
    {
      id: 'fat-loss',
      title: 'Fat Loss',
      description: 'Shed unwanted body fat and reveal your best physique while maintaining muscle.',
      image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accent: 'from-scarlet/80 to-scarlet-dark/40'
    },
    {
      id: 'strength',
      title: 'Strength Training',
      description: 'Focus on raw power and functional strength for everyday performance.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accent: 'from-blue-600/80 to-blue-800/40'
    },
    {
      id: 'endurance',
      title: 'Endurance',
      description: 'Improve cardiovascular fitness and stamina for better overall health.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accent: 'from-green-600/80 to-green-800/40'
    },
    {
      id: 'flexibility',
      title: 'Flexibility & Mobility',
      description: 'Enhance range of motion, prevent injuries, and improve performance.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accent: 'from-purple-600/80 to-purple-800/40'
    },
    {
      id: 'athletic',
      title: 'Athletic Performance',
      description: 'Sport-specific training to enhance your competitive edge.',
      image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accent: 'from-orange-600/80 to-orange-800/40'
    }
  ];

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 'experience',
      question: 'What is your fitness experience level?',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Elite']
    },
    {
      id: 'time',
      question: 'How much time can you dedicate to training weekly?',
      options: ['Less than 3 hours', '3-5 hours', '5-8 hours', 'More than 8 hours']
    },
    {
      id: 'age',
      question: 'What is your age range?',
      options: ['18-24', '25-34', '35-49', '50+']
    },
    {
      id: 'equipment',
      question: 'What equipment do you have access to?',
      options: ['Home bodyweight only', 'Basic home gym', 'Full commercial gym', 'Premium facility']
    }
  ];

  const toggleGoalSelection = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      } else {
        return [...prev, goalId];
      }
    });
  };

  const handleContinue = () => {
    setShowAssessment(true);
  };

  const handleAssessmentAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestionIndex].id]: answer
    }));

    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered, proceed to trainers
      setIsLoading(true);
      setTimeout(() => {
        navigate('/trainers', { 
          state: { 
            selectedGoals,
            assessmentAnswers: answers
          } 
        });
      }, 1500);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setShowAssessment(false);
    }
  };

  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {!showAssessment ? (
            <>
              <div className="mb-10 md:mb-16 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-wider text-white mb-4">
                  Select Your <span className="text-gold">Fitness Goals</span>
                </h1>
                <p className="text-white/70 text-lg max-w-3xl mx-auto">
                  Choose one or more fitness objectives that align with your aspirations. 
                  Your selection will help us tailor the perfect training program for you.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {goals.map((goal) => (
                  <Card 
                    key={goal.id}
                    onClick={() => toggleGoalSelection(goal.id)}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-2 
                      ${selectedGoals.includes(goal.id) 
                        ? 'border-gold shadow-[0_0_20px_rgba(226,179,60,0.3)]' 
                        : 'border-dark-300 hover:border-white/30'
                      } bg-dark-200/50 backdrop-blur-sm`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img 
                        src={goal.image} 
                        alt={goal.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${goal.accent} mix-blend-multiply`}></div>
                      
                      {selectedGoals.includes(goal.id) && (
                        <div className="absolute top-3 right-3 bg-gold rounded-full p-1">
                          <Check className="h-5 w-5 text-dark" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{goal.title}</h3>
                      <p className="text-white/70">{goal.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleContinue}
                  disabled={selectedGoals.length === 0}
                  className={`btn-primary ${selectedGoals.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue to Quick Assessment <ChevronRight className="ml-2" />
                </Button>
              </div>
              
              <div className="mt-8 text-center text-white/50 text-sm">
                <p>You can always update your goals later from your profile dashboard.</p>
              </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto glass-panel p-8 md:p-10">
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 text-gold animate-spin mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Finding Perfect Matches</h3>
                  <p className="text-white/70">We're matching you with trainers who specialize in your goals...</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <button 
                        onClick={handleGoBack}
                        className="text-white/70 hover:text-white flex items-center"
                      >
                        <ChevronRight className="h-5 w-5 rotate-180 mr-1" />
                        Back
                      </button>
                      <div className="text-white/70">
                        Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {assessmentQuestions[currentQuestionIndex].question}
                    </h2>
                    
                    <RadioGroup
                      className="space-y-4"
                      value={answers[assessmentQuestions[currentQuestionIndex].id]}
                      onValueChange={handleAssessmentAnswer}
                    >
                      {assessmentQuestions[currentQuestionIndex].options.map((option) => (
                        <div 
                          key={option} 
                          className="flex items-center space-x-3 border border-dark-300 p-4 rounded-md hover:border-gold/50 transition-colors cursor-pointer"
                          onClick={() => handleAssessmentAnswer(option)}
                        >
                          <RadioGroupItem 
                            value={option} 
                            id={option} 
                            className="border-gold text-gold"
                          />
                          <label htmlFor={option} className="text-white font-medium cursor-pointer flex-1">
                            {option}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-white/70 text-sm">
                      {selectedGoals.length} goals selected
                    </div>
                    
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex -space-x-2">
                          {selectedGoals.slice(0, 3).map((goalId) => {
                            const goal = goals.find(g => g.id === goalId);
                            return (
                              <div 
                                key={goalId}
                                className="w-8 h-8 rounded-full border-2 border-dark-100 overflow-hidden"
                              >
                                <img 
                                  src={goal?.image}
                                  alt={goal?.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            );
                          })}
                          {selectedGoals.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-dark-100 bg-dark-300 flex items-center justify-center text-xs text-white">
                              +{selectedGoals.length - 3}
                            </div>
                          )}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-dark-100 border border-dark-300 text-white p-3">
                        <div className="text-sm font-semibold mb-2">Selected Goals:</div>
                        <ul className="space-y-1">
                          {selectedGoals.map((goalId) => {
                            const goal = goals.find(g => g.id === goalId);
                            return (
                              <li key={goalId} className="text-sm flex items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold mr-2"></span>
                                {goal?.title}
                              </li>
                            );
                          })}
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-300 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-white/40 text-sm">
              © 2023 Scarface Fitness. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Goals;
