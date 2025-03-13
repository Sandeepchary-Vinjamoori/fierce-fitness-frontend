
import { Shield, Zap, Trophy, Target, Users, Clock } from 'lucide-react';

const Benefits = () => {
  const features = [
    {
      icon: <Shield className="text-gold w-10 h-10" />,
      title: "Expert Guidance",
      description: "Train with certified professionals who customize routines to your specific body type and goals."
    },
    {
      icon: <Zap className="text-gold w-10 h-10" />,
      title: "Rapid Results",
      description: "Our scientifically-backed methods deliver visible results in half the time of conventional programs."
    },
    {
      icon: <Trophy className="text-gold w-10 h-10" />,
      title: "Elite Community",
      description: "Join a network of high-performers who push each other to break barriers and achieve greatness."
    },
    {
      icon: <Target className="text-gold w-10 h-10" />,
      title: "Goal Tracking",
      description: "Advanced analytics and progress tracking to keep you motivated and accountable."
    },
    {
      icon: <Users className="text-gold w-10 h-10" />,
      title: "Supportive Culture",
      description: "A community that celebrates every victory and supports you through every challenge."
    },
    {
      icon: <Clock className="text-gold w-10 h-10" />,
      title: "Flexible Scheduling",
      description: "Train on your time with 24/7 access to facilities and on-demand coaching support."
    }
  ];
  
  return (
    <section className="py-24 bg-dark-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(226,179,60,0.05)_0%,transparent_50%)] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">Why Choose <span className="text-gold">Scarface</span> Fitness</h2>
          <p className="text-white/70 text-lg">
            We don't just build bodies, we forge legends. Our approach combines cutting-edge science with battle-tested methods to transform your physique and mindset.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card flex flex-col items-start"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
