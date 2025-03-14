
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useClickAway } from '@/hooks/useClickAway';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  // Close profile menu when clicking outside
  useClickAway(profileMenuRef, () => {
    setProfileMenuOpen(false);
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setProfileMenuOpen(false);
    navigate('/');
  };

  // Get the user's initials for the avatar
  const getInitials = () => {
    if (!profile?.full_name) return 'U';
    return profile.full_name.split(' ')[0][0].toUpperCase();
  };

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
            {user && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-gold text-dark flex items-center justify-center font-bold text-lg hover:bg-gold-light transition-colors"
                >
                  {getInitials()}
                </button>
                
                {/* Profile dropdown menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-dark-100 border border-dark-300 rounded-md shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-dark-300">
                      <p className="text-sm text-white/80">Signed in as</p>
                      <p className="text-sm font-medium truncate">{profile?.full_name || 'User'}</p>
                    </div>
                    
                    <div className="px-4 py-2">
                      <p className="text-sm text-white/80">Contact Information</p>
                      <p className="text-sm truncate">{user.email}</p>
                      {profile?.phone_number && (
                        <p className="text-sm truncate">{profile.phone_number}</p>
                      )}
                    </div>
                    
                    <div className="border-t border-dark-300 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-white hover:bg-dark-200 w-full text-left flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/auth" className="nav-link">Sign Up</Link>
                <Link to="/auth" className="btn-accent">Sign In</Link>
              </>
            )}
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
        mobileMenuOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link to="/" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/goals" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Goal Selection</Link>
          <Link to="/trainers" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Trainers</Link>
          <Link to="/pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          {user && <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>}
          
          {user ? (
            <>
              <div className="py-2 border-t border-dark-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold text-dark flex items-center justify-center font-bold">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="font-medium">{profile?.full_name || 'User'}</p>
                    <p className="text-sm text-white/70">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-dark-300 rounded-md text-white flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              <Link to="/auth" className="btn-accent text-center" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
