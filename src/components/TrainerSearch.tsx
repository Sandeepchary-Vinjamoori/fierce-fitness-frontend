
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TrainerSearch = () => {
  const [query, setQuery] = useState('');
  
  return (
    <div className="mb-6 relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
        <Input
          type="text"
          placeholder="Search by name, specialty, or certification..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-dark-100 border-dark-300 text-white placeholder:text-white/50 focus-visible:ring-gold/50"
        />
      </div>
    </div>
  );
};

export default TrainerSearch;
