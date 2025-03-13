
import { useState } from 'react';
import { Star, CheckCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trainer } from '@/types/trainer';
import TrainerDetails from './TrainerDetails';

// Mock data for trainers
const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specialty: 'Strength & Conditioning',
    experience: 8,
    rating: 4.9,
    reviews: 120,
    price: 75,
    bio: 'Former collegiate athlete with 8+ years of experience transforming bodies and minds. Specializes in strength training, muscle building, and athletic performance enhancement.',
    certifications: [
      { name: 'NSCA Certified Strength & Conditioning Specialist', organization: 'NSCA', year: 2017 },
      { name: 'Precision Nutrition Level 2', organization: 'Precision Nutrition', year: 2019 }
    ],
    specialties: ['Strength Training', 'Muscle Gain', 'Sports Performance'],
    availability: [
      { day: 'Monday', availability: ['9:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'] },
      { day: 'Wednesday', availability: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'] },
      { day: 'Friday', availability: ['8:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'] }
    ],
    isAvailable: true,
    popularity: 92
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1609899464110-a7caddaef3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specialty: 'Nutrition & Fat Loss',
    experience: 6,
    rating: 4.8,
    reviews: 98,
    price: 65,
    bio: 'Passionate about helping clients achieve sustainable weight loss through smart nutrition and effective training strategies. Holistic approach focusing on lifestyle changes.',
    certifications: [
      { name: 'ACE Certified Personal Trainer', organization: 'ACE', year: 2018 },
      { name: 'NASM Weight Loss Specialist', organization: 'NASM', year: 2020 }
    ],
    specialties: ['Weight Loss', 'Nutrition', 'Women\'s Fitness'],
    availability: [
      { day: 'Tuesday', availability: ['8:00 AM', '10:00 AM', '1:00 PM', '4:00 PM'] },
      { day: 'Thursday', availability: ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'] },
      { day: 'Saturday', availability: ['10:00 AM', '12:00 PM', '2:00 PM'] }
    ],
    isAvailable: true,
    popularity: 88
  },
  {
    id: '3',
    name: 'Marcus Williams',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specialty: 'Bodybuilding',
    experience: 10,
    rating: 5.0,
    reviews: 156,
    price: 90,
    bio: 'Competition bodybuilder with a decade of experience transforming physiques. Specializes in hypertrophy training and competition prep.',
    certifications: [
      { name: 'ISSA Master Trainer', organization: 'ISSA', year: 2015 },
      { name: 'IFBB Pro Card Holder', organization: 'IFBB', year: 2018 }
    ],
    specialties: ['Muscle Gain', 'Competition Prep', 'Strength Training'],
    availability: [
      { day: 'Monday', availability: ['6:00 AM', '9:00 AM', '5:00 PM', '8:00 PM'] },
      { day: 'Wednesday', availability: ['6:00 AM', '9:00 AM', '5:00 PM', '8:00 PM'] },
      { day: 'Friday', availability: ['6:00 AM', '9:00 AM', '5:00 PM', '8:00 PM'] }
    ],
    isAvailable: false,
    popularity: 95
  },
  {
    id: '4',
    name: 'Diana Lee',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specialty: 'Mobility & Recovery',
    experience: 7,
    rating: 4.7,
    reviews: 110,
    price: 70,
    bio: 'Former physical therapist turned fitness coach specializing in mobility, flexibility, and injury prevention. Holistic approach to movement and recovery.',
    certifications: [
      { name: 'NASM Corrective Exercise Specialist', organization: 'NASM', year: 2016 },
      { name: 'FRC Mobility Specialist', organization: 'FRC', year: 2019 }
    ],
    specialties: ['Mobility & Recovery', 'Flexibility', 'Injury Prevention'],
    availability: [
      { day: 'Tuesday', availability: ['7:00 AM', '11:00 AM', '2:00 PM', '6:00 PM'] },
      { day: 'Thursday', availability: ['7:00 AM', '11:00 AM', '2:00 PM', '6:00 PM'] },
      { day: 'Saturday', availability: ['9:00 AM', '1:00 PM', '4:00 PM'] }
    ],
    isAvailable: true,
    popularity: 82
  },
  {
    id: '5',
    name: 'James Harper',
    image: 'https://images.unsplash.com/photo-1567324216428-67f63868fcb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specialty: 'Sports Performance',
    experience: 12,
    rating: 4.9,
    reviews: 135,
    price: 85,
    bio: 'Former pro athlete and strength coach with experience training elite performers. Focuses on functional strength, explosiveness, and sport-specific training.',
    certifications: [
      { name: 'CSCS', organization: 'NSCA', year: 2012 },
      { name: 'USAW Level 2', organization: 'USA Weightlifting', year: 2014 }
    ],
    specialties: ['Sports Performance', 'Strength Training', 'Athletic Development'],
    availability: [
      { day: 'Monday', availability: ['10:00 AM', '1:00 PM', '3:00 PM', '7:00 PM'] },
      { day: 'Wednesday', availability: ['10:00 AM', '1:00 PM', '3:00 PM', '7:00 PM'] },
      { day: 'Friday', availability: ['10:00 AM', '1:00 PM', '3:00 PM', '7:00 PM'] }
    ],
    isAvailable: true,
    popularity: 90
  }
];

interface TrainersListProps {
  selectedGoals: string[];
}

const TrainersList = ({ selectedGoals }: TrainersListProps) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  
  // Filter trainers based on selected goals
  const filteredTrainers = selectedGoals.length > 0
    ? mockTrainers.filter(trainer => 
        trainer.specialties.some(specialty => 
          selectedGoals.some(goal => 
            specialty.toLowerCase().includes(goal.toLowerCase())
          )
        )
      )
    : mockTrainers;
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div 
            key={trainer.id} 
            className="glass-panel overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(226,179,60,0.15)] group"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={trainer.image} 
                alt={trainer.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-90"></div>
              <div className="absolute left-4 bottom-4 right-4">
                <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                <p className="text-gold">{trainer.specialty}</p>
              </div>
              
              {trainer.isAvailable && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-scarlet text-white text-xs font-bold rounded flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                  Available Now
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <Star className="fill-gold text-gold w-4 h-4" />
                  <span className="text-white ml-1 font-medium">{trainer.rating}</span>
                  <span className="text-white/50 ml-1">({trainer.reviews} reviews)</span>
                </div>
                <div className="text-white/80 text-sm">{trainer.experience} Yrs Exp.</div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {trainer.specialties.slice(0, 2).map((specialty, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-dark-200 text-white/80 text-xs rounded"
                  >
                    {specialty}
                  </span>
                ))}
                {trainer.specialties.length > 2 && (
                  <span className="px-2 py-1 bg-dark-200 text-white/80 text-xs rounded">
                    +{trainer.specialties.length - 2}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-white font-bold">
                  ${trainer.price}<span className="text-white/60 font-normal text-sm">/session</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="border border-gold/30 text-gold hover:bg-gold/10 hover:text-gold-light"
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  View Profile
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTrainers.length === 0 && (
        <div className="glass-panel p-8 text-center">
          <h3 className="text-xl font-bold mb-2">No trainers match your criteria</h3>
          <p className="text-white/70">Try adjusting your filters or selecting different goals</p>
        </div>
      )}
      
      {/* Trainer Detail Dialog */}
      <Dialog open={!!selectedTrainer} onOpenChange={(open) => !open && setSelectedTrainer(null)}>
        <DialogContent className="max-w-4xl bg-dark-100 border border-dark-300 text-white max-h-[90vh] overflow-y-auto">
          {selectedTrainer && <TrainerDetails trainer={selectedTrainer} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrainersList;
