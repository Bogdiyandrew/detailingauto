'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gem } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { motion, AnimatePresence } from 'framer-motion';

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

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.1 } as const
    },
    exit: { 
      x: '100%', 
      transition: { type: 'spring', stiffness: 300, damping: 30 } as const
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 z-50 w-full transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-brand-dark/85 backdrop-blur-md border-white/10 py-3 shadow-lg' 
            : 'bg-transparent border-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 text-white">
          
          <Link 
            href="#" 
            className="flex items-center gap-2 text-xl font-bold tracking-wider group focus:outline-none" 
            onClick={handleLogoClick}
          >
            <div className="relative">
              <Gem className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'}`} />
              <div className="absolute inset-0 bg-brand-accent/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span>
              DIAMOND <span className="text-brand-accent">DETAILING</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-white rounded-full group"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 } as const}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-brand-accent' : 'text-brand-gray group-hover:text-white'}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}

            <a 
              href="#contact" 
              className={`ml-4 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-brand-accent/25 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                activeSection === 'contact' 
                  ? 'bg-gradient-to-r from-sky-400 to-brand-accent ring-2 ring-white/20' 
                  : 'bg-brand-accent hover:bg-sky-400'
              }`}
            >
              Programează-te
            </a>
          </nav>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              aria-label="Deschide meniul" 
              className="p-2 text-brand-gray hover:text-white transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[59] bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              key="mobile-menu" 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[60] bg-brand-dark border-l border-white/10 shadow-2xl"
            >
              <div className="p-6 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex justify-between items-center mb-12 relative z-10">
                  <span className="font-bold text-xl tracking-wider text-white">
                    DIAMOND<span className="text-brand-accent">.</span>
                  </span>
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    aria-label="Închide meniul" 
                    className="p-2 text-brand-gray hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 relative z-10">
                  {navLinks.map((link) => {
                     const isActive = activeSection === link.href.substring(1);
                     return (
                      <motion.a 
                        key={link.href} 
                        href={link.href} 
                        variants={itemVariants}
                        onClick={() => setIsMenuOpen(false)} 
                        className={`text-2xl font-semibold transition-colors flex items-center gap-3 ${
                          isActive ? 'text-brand-accent' : 'text-white hover:text-brand-accent'
                        }`}
                      >
                        {isActive && <motion.div layoutId="mobileIndicator" className="w-1.5 h-1.5 rounded-full bg-brand-accent" />}
                        {link.label}
                      </motion.a>
                    )
                  })}
                </nav>

                <motion.div variants={itemVariants} className="mt-auto relative z-10 mb-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-brand-gray text-sm mb-2">Gata de recondiționare?</h4>
                    <a 
                      href="#contact" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full rounded-xl bg-brand-accent py-4 text-center text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
                    >
                      Rezervă acum
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;