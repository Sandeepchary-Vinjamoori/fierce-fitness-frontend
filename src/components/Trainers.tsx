
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Trainers = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const trainers = [
    {
      name: "Alex Rodriguez",
      specialty: "Strength & Conditioning",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 120
    },
    {
      name: "Sarah Johnson",
      specialty: "Nutrition & Fat Loss",
      image: "https://images.unsplash.com/photo-1609899464110-a7caddaef3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      reviews: 98
    },
    {
      name: "Marcus Williams",
      specialty: "Bodybuilding",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e6349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5.0,
      reviews: 156
    },
    {
      name: "Diana Lee",
      specialty: "Mobility & Recovery",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      reviews: 110
    },
    {
      name: "James Harper",
      specialty: "Sports Performance",
      image: "https://images.unsplash.com/photo-1567324216428-67f63868fcb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 135
    }
  ];
  
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = 320; // Approximate card width + gap
    const currentScroll = sliderRef.current.scrollLeft;
    
    sliderRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="py-24 bg-dark-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.05)_0%,transparent_70%)] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="section-heading mb-6">Elite <span className="text-gold">Trainers</span></h2>
            <p className="text-white/70 text-lg max-w-2xl">
              Learn from the best in the industry. Our trainers have transformed thousands of lives and bodies with their expertise and dedication.
            </p>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-white/20 hover:border-gold/60 text-white hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-white/20 hover:border-gold/60 text-white hover:text-gold transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trainers.map((trainer, index) => (
              <div 
                key={index}
                className="glass-panel min-w-[300px] flex-shrink-0 overflow-hidden snap-start"
              >
                <div className="relative h-80">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                    <p className="text-gold">{trainer.specialty}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Star className="fill-gold text-gold w-5 h-5" />
                      <span className="text-white ml-1 font-medium">{trainer.rating}</span>
                      <span className="text-white/50 ml-1">({trainer.reviews} reviews)</span>
                    </div>
                  </div>
                  <button className="w-full text-center py-2 border border-gold/30 text-gold hover:bg-gold/10 transition-colors rounded">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fades for slider edges */}
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-dark-100 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-dark-100 to-transparent"></div>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/trainers" className="inline-flex items-center text-gold hover:text-gold-light transition-colors">
            View All Trainers <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
