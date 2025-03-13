
import { useState } from 'react';
import { Sliders, Star, Award, Calendar } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterOptions, SortOption } from '@/types/trainer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const specialties = [
  'Weight Loss',
  'Muscle Gain', 
  'Strength Training',
  'Cardio Fitness',
  'Flexibility',
  'Nutrition',
  'Sports Performance',
  'Mobility & Recovery'
];

const TrainerFilters = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    experience: 0,
    rating: 3,
    specialties: [],
    availability: false
  });
  
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  
  const handleSpecialtyChange = (specialty: string) => {
    setFilters(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      
      return { ...prev, specialties };
    });
  };
  
  return (
    <div className="glass-panel p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Filters</h3>
        <Sliders size={18} className="text-gold" />
      </div>
      
      <div className="space-y-6">
        {/* Sort Options */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white/80">Sort By</h4>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="bg-dark-100 border-dark-300">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Experience Filter */}
        <div>
          <div className="flex items-center mb-3">
            <Award size={16} className="text-gold mr-2" />
            <h4 className="text-sm font-medium text-white/80">Experience</h4>
          </div>
          <Slider
            defaultValue={[filters.experience]}
            max={20}
            step={1}
            onValueChange={(values) => setFilters({...filters, experience: values[0]})}
            className="my-4"
          />
          <div className="text-sm text-white/70">
            {filters.experience}+ years
          </div>
        </div>
        
        {/* Rating Filter */}
        <div>
          <div className="flex items-center mb-3">
            <Star size={16} className="text-gold mr-2" />
            <h4 className="text-sm font-medium text-white/80">Rating</h4>
          </div>
          <Slider
            defaultValue={[filters.rating]}
            max={5}
            step={0.5}
            onValueChange={(values) => setFilters({...filters, rating: values[0]})}
            className="my-4"
          />
          <div className="text-sm text-white/70">
            {filters.rating}+ stars
          </div>
        </div>
        
        {/* Specialties Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white/80">Specialization</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-none">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center">
                <Checkbox
                  id={specialty}
                  checked={filters.specialties.includes(specialty)}
                  onCheckedChange={() => handleSpecialtyChange(specialty)}
                  className="border-dark-300 data-[state=checked]:bg-gold data-[state=checked]:text-dark"
                />
                <label
                  htmlFor={specialty}
                  className="ml-2 text-sm font-medium text-white/80 cursor-pointer"
                >
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Availability Filter */}
        <div>
          <div className="flex items-center">
            <Checkbox
              id="availability"
              checked={filters.availability}
              onCheckedChange={(checked) => 
                setFilters({...filters, availability: !!checked})}
              className="border-dark-300 data-[state=checked]:bg-gold data-[state=checked]:text-dark"
            />
            <label
              htmlFor="availability"
              className="ml-2 text-sm font-medium text-white/80 cursor-pointer flex items-center"
            >
              <Calendar size={14} className="mr-1 text-gold" />
              Available Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerFilters;
