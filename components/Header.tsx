'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gem } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
// FIX: Am adăugat 'Variants' în import
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navLinks = [
    { href: '#galerie', label: 'Galerie' },
    { href: '#servicii', label: 'Servicii' },
    { href: '#recenzii', label: 'Recenzii' },
  ];
  
  const activeSection = useScrollSpy(['galerie', 'servicii', 'recenzii', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FIX: Am adăugat tipul ': Variants' aici pentru a rezolva eroarea TypeScript
  const menuVariants: Variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { duration: 0.3 }
    },
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl' 
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-16 text-white">
          
          {/* LOGO */}
          <Link 
            href="#" 
            className="flex items-center gap-2.5 group focus:outline-none" 
            onClick={handleLogoClick}
          >
            <div className="relative flex items-center justify-center">
              <Gem className="h-7 w-7 text-brand-accent transition-transform group-hover:scale-110 duration-300 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-wider text-white">DIAMOND</span>
              <span className="text-[0.65rem] font-medium tracking-[0.2em] text-brand-accent uppercase">Detailing</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="relative px-5 py-2 text-sm font-medium transition-all rounded-full group"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA BUTTON */}
          <div className="hidden md:block">
             <a 
              href="#contact" 
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-accent px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-sky-400 hover:shadow-brand-accent/40 active:scale-95"
            >
              <span className="relative z-10">Programează-te</span>
              <div className="absolute inset-0 -z-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
            </a>
          </div>

          {/* MOBILE BURGER */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              aria-label="Deschide meniul" 
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </motion.header>
      
      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
            />
            
            {/* Side Drawer */}
            <motion.div
              key="mobile-menu" 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[60] bg-[#0f1115] border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full p-6">
                
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-10">
                   <div className="flex items-center gap-2">
                      <Gem className="h-6 w-6 text-brand-accent" />
                      <span className="font-bold text-lg text-white tracking-wide">MENU</span>
                   </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    aria-label="Închide meniul" 
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, i) => {
                     const isActive = activeSection === link.href.substring(1);
                     return (
                      <motion.a 
                        key={link.href} 
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        onClick={() => setIsMenuOpen(false)} 
                        className={`text-xl font-medium px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                          isActive 
                            ? 'bg-white/10 text-brand-accent' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.label}
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />}
                      </motion.a>
                    )
                  })}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-auto mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 text-center"
                  >
                    <h4 className="text-gray-300 text-sm mb-4">Vrei să redai strălucirea mașinii?</h4>
                    <a 
                      href="#contact" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full rounded-xl bg-brand-accent py-3.5 text-base font-bold text-white shadow-lg shadow-brand-accent/20 transition-transform active:scale-95 hover:bg-sky-400"
                    >
                      Programează o vizită
                    </a>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;