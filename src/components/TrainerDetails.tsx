
import { useState } from 'react';
import { Star, Award, Calendar, CheckCircle, Clock, MessageCircle, ArrowRight, DollarSign } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trainer } from '@/types/trainer';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface TrainerDetailsProps {
  trainer: Trainer;
  onClose?: () => void;
}

const TrainerDetails = ({ trainer, onClose }: TrainerDetailsProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSelectTrainer = () => {
    toast({
      title: "Trainer Selected",
      description: `You've selected ${trainer.name} as your trainer.`,
    });
    
    // Navigate to checkout with trainer data
    navigate('/checkout', { 
      state: { 
        trainer, 
        selectedTime, 
        selectedDay 
      } 
    });
    
    // Close the modal if we're in a modal
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="mb-6 text-center">
          <div className="relative mx-auto w-32 h-32 mb-4">
            <Avatar className="w-32 h-32 border-2 border-gold">
              <AvatarImage src={trainer.image} alt={trainer.name} />
              <AvatarFallback className="bg-dark-200 text-2xl">
                {trainer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {trainer.isAvailable && (
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-scarlet rounded-full border-2 border-dark-100 flex items-center justify-center">
                <span className="sr-only">Available now</span>
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-bold">{trainer.name}</h2>
          <p className="text-gold mb-2">{trainer.specialty}</p>
          
          <div className="flex items-center justify-center">
            <Star className="fill-gold text-gold w-5 h-5" />
            <span className="text-white ml-1 font-medium">{trainer.rating}</span>
            <span className="text-white/50 ml-1">({trainer.reviews} reviews)</span>
          </div>
        </div>
        
        <div className="glass-panel p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-white/70 text-sm">Price</span>
              <p className="text-xl font-bold text-white">${trainer.price}</p>
              <span className="text-white/60 text-xs">per session</span>
            </div>
            <DollarSign size={24} className="text-gold opacity-60" />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-white/70 text-sm">Experience</span>
              <p className="text-xl font-bold text-white">{trainer.experience} years</p>
            </div>
            <Award size={24} className="text-gold opacity-60" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/70 text-sm">Availability</span>
              <p className="text-xl font-bold text-white">
                {trainer.isAvailable ? "Available Now" : "Not Available"}
              </p>
            </div>
            <Calendar size={24} className="text-gold opacity-60" />
          </div>
        </div>
        
        <div className="glass-panel p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <Award size={18} className="text-gold mr-2" />
            Certifications
          </h3>
          <ul className="space-y-3">
            {trainer.certifications.map((cert, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={16} className="text-gold mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{cert.name}</p>
                  <p className="text-white/60 text-sm">{cert.organization} • {cert.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="md:col-span-2">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full mb-6 bg-dark-200 p-1">
            <TabsTrigger value="about" className="flex-1 data-[state=active]:bg-dark-100 data-[state=active]:text-gold">
              About
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex-1 data-[state=active]:bg-dark-100 data-[state=active]:text-gold">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="specialties" className="flex-1 data-[state=active]:bg-dark-100 data-[state=active]:text-gold">
              Specialties
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-0">
            <div className="glass-panel p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-white/80 leading-relaxed">{trainer.bio}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button className="flex items-center bg-dark-200 hover:bg-dark-300 text-white">
                <MessageCircle size={18} className="mr-2" />
                Contact
              </Button>
              <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                View All Reviews
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-0">
            <div className="glass-panel p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Availability</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {trainer.availability.map((day) => (
                  <div 
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedDay === day.day 
                        ? 'border-gold bg-gold/10 text-gold' 
                        : 'border-dark-300 bg-dark-200 hover:border-gold/30'
                    }`}
                  >
                    <div className="font-medium">{day.day}</div>
                    <div className="text-sm text-white/60">{day.availability.length} slots</div>
                  </div>
                ))}
              </div>
              
              {selectedDay && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Clock size={16} className="text-gold mr-2" />
                    Available times on {selectedDay}
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {trainer.availability
                      .find(day => day.day === selectedDay)
                      ?.availability.map((time) => (
                        <div
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-1 rounded cursor-pointer text-sm transition-all ${
                            selectedTime === time
                              ? 'bg-gold text-dark font-medium'
                              : 'bg-dark-200 hover:bg-dark-300'
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="specialties" className="mt-0">
            <div className="glass-panel p-6">
              <h3 className="text-xl font-bold mb-4">Specializations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainer.specialties.map((specialty, idx) => (
                  <div key={idx} className="flex items-start p-3 bg-dark-200 rounded-lg">
                    <CheckCircle size={18} className="text-gold mr-3 mt-1" />
                    <div>
                      <p className="font-medium">{specialty}</p>
                      <p className="text-sm text-white/60">Expert level training</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 glass-panel p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Ready to start?</h3>
            <p className="text-white/70">No sign-up required</p>
          </div>
          
          <Button 
            onClick={handleSelectTrainer}
            className="w-full bg-gold hover:bg-gold-light text-dark font-bold py-3"
            disabled={!selectedDay || !selectedTime}
          >
            Select Trainer
            <ArrowRight size={18} className="ml-2" />
          </Button>
          
          {(!selectedDay || !selectedTime) && (
            <p className="text-center text-white/60 text-sm mt-2">
              Please select a day and time to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
