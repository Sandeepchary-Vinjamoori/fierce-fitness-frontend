
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GoalBased = () => {
  const goals = [
    {
      title: "Muscle Building",
      description: "Add lean muscle mass and sculpt a powerful physique with our hypertrophy-focused programs.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-scarlet/80 to-scarlet/0"
    },
    {
      title: "Fat Loss",
      description: "Shed unwanted body fat while preserving muscle mass with our metabolic conditioning protocols.",
      image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-gold/80 to-gold/0"
    },
    {
      title: "Strength & Power",
      description: "Develop functional strength and explosive power through progressive overload and specialized techniques.",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-600/80 to-blue-600/0"
    }
  ];
  
  return (
    <section className="py-24 bg-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(196,30,58,0.05)_0%,transparent_50%)] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-2/5">
            <h2 className="section-heading mb-6">Personalized <span className="text-gold">Goal-Based</span> Training</h2>
            <p className="text-white/70 text-lg mb-6">
              Your body is unique, and your training should be too. Our goal-specific programs are designed to target your exact objectives with precision and efficiency.
            </p>
            <p className="text-white/70 text-lg mb-8">
              Whether you're looking to build muscle, lose fat, or enhance athletic performance, our tailored approach ensures optimal results in minimal time.
            </p>
            <Link to="/goals" className="btn-primary inline-flex items-center gap-2 group">
              Find Your Program <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </Link>
          </div>
          
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden relative ${index === 2 ? "md:col-span-2" : ""}`}
              >
                <img 
                  src={goal.image} 
                  alt={goal.title} 
                  className="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${goal.color} mix-blend-multiply`}></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{goal.title}</h3>
                  <p className="text-white/90 text-sm">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalBased;
