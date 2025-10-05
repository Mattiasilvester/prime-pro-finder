import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();

  // Determina se mostrare la freccia indietro (solo su mobile e non nella homepage)
  const [showBackArrow, setShowBackArrow] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowBackArrow(location.pathname !== '/' && window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [location.pathname]);

  const handleBackClick = () => {
    navigate(-1);
  };


  const isActive = (path: string) => location.pathname === path;

  // Nascondi ScrollTopButton quando il menu mobile è aperto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Professionisti', path: '/professionisti' },
    { label: 'Come Funziona', path: '/come-funziona' },
    { label: 'Diventa Partner', path: '/per-professionisti' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between relative">
          {/* Mobile Back Arrow */}
          {showBackArrow && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="md:hidden p-2 bg-gold hover:bg-gold/90 text-black hover:text-black z-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}

          {/* Logo */}
          <Link to="/" className={`flex items-center space-x-2 ${showBackArrow ? 'absolute left-1/2 transform -translate-x-1/2' : ''}`}>
            <div className="font-bold text-xl">
              <span className="text-foreground">Performance</span>
              <span className="text-gold"> Prime</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors font-bold relative inline-block pb-1 ${
                  link.label === 'Diventa Partner'
                    ? 'text-gold hover:text-gold/80'
                    : isActive(link.path)
                    ? 'text-black hover:text-black/80'
                    : 'text-black hover:text-black/80'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-[60%] ${
                      link.label === 'Diventa Partner' 
                        ? 'bg-black' 
                        : 'bg-[#EEBA2B]'
                    }`}
                  />
                )}
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className={isAuthenticated ? "bg-gold text-black hover:bg-gold/90 border-gold" : ""}
              asChild
            >
              <Link to={isAuthenticated ? '/profilo' : '/accedi'}>
                {isAuthenticated ? 'Profilo' : 'Accedi'}
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2 z-10">
            {showBackArrow && (
              <div className="w-9 h-9"></div> // Spacer per bilanciare layout
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Slide from right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-hero z-[9999] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-4 py-6 space-y-4 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-3 text-base transition-colors ${
                isActive(link.path)
                  ? 'text-gold font-bold'
                  : 'text-white hover:text-gold font-medium'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full mt-6 ${isAuthenticated ? "bg-gold text-black hover:bg-gold/90 border-gold" : "border-gold text-gold hover:bg-gold hover:text-black"}`}
            asChild
          >
            <Link to={isAuthenticated ? '/profilo' : '/accedi'} onClick={() => setMobileMenuOpen(false)}>
              {isAuthenticated ? 'Profilo' : 'Accedi'}
            </Link>
          </Button>
        </nav>

        {/* Logo at bottom */}
        <div className="p-6 flex justify-center items-center border-t border-white/10">
          <div className="text-xl font-extrabold" style={{ fontFamily: 'Cinzel, serif' }}>
            <span className="text-white">Performance</span>
            <span className="text-gold"> Prime</span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};
