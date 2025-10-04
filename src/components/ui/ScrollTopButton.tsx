import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Pagine dove NON mostrare il button
  const excludedPaths = [
    '/login',
    '/signin',
    '/signup',
    '/register',
    '/auth',
    '/onboarding',
    '/create-profile',
    '/setup-profile',
    '/welcome',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/complete-profile'
  ];
  
  // Controlla se siamo in una pagina esclusa
  const isExcludedPage = excludedPaths.some(path => 
    location.pathname?.toLowerCase().includes(path)
  );
  
  // Se siamo in una pagina esclusa, non renderizzare nulla
  if (isExcludedPage) return null;

  // Controlla se il menu mobile è aperto
  useEffect(() => {
    const checkMobileMenu = () => {
      setMobileMenuOpen(document.body.classList.contains('mobile-menu-open'));
    };

    checkMobileMenu();
    const observer = new MutationObserver(checkMobileMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const toggleVisibility = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(window.pageYOffset > 300);
      }, 100);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Nascondi se non è visibile o se il menu mobile è aperto
  if (!isVisible || mobileMenuOpen) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-50 
                 w-12 h-12 md:w-14 md:h-14
                 bg-[#EEBA2B] hover:bg-[#D4A526] active:bg-[#C09321]
                 rounded-full 
                 shadow-[0_4px_14px_rgba(238,186,43,0.35)]
                 border-2 border-black/10
                 transition-all duration-200 ease-out
                 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] focus:ring-offset-2
                 group"
      aria-label="Torna all'inizio della pagina"
      title="Torna su"
    >
      <ArrowUp 
        className="w-6 h-6 text-black mx-auto group-hover:translate-y-[-2px] transition-transform" 
        strokeWidth={2.5}
      />
    </button>
  );
}

