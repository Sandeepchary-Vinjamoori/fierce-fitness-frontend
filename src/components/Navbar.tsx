
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-100/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold tracking-wider">
              <span className="text-gold">SCARFACE</span> FITNESS
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/goals" className="nav-link">Goal Selection</Link>
            <Link to="/trainers" className="nav-link">Trainers</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </div>
          
          <div className="hidden md:block">
            <Link to="/login" className="btn-accent">Start Now</Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gold" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full bg-dark-200/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-[400px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link to="/" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/goals" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Goal Selection</Link>
          <Link to="/trainers" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Trainers</Link>
          <Link to="/pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link to="/login" className="btn-accent text-center" onClick={() => setMobileMenuOpen(false)}>Start Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
