'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gem } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navLinks = [
    { href: '#galerie', label: 'Galerie' },
    { href: '#servicii', label: 'Servicii' },
    { href: '#recenzii', label: 'Recenzii' },
    { href: '#contact',label: 'Contact'},
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
        className={`fixed top-0 z-50 w-full transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#0B0B0F]/80 backdrop-blur-xl border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-16 text-white">
          
          {/* LOGO */}
          <Link 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none" 
            onClick={handleLogoClick}
          >
            <div className="relative flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-brand-accent/30 transition-colors">
              <div className="absolute inset-0 bg-brand-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Gem className="relative h-6 w-6 text-brand-accent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-gray-100 transition-colors">DIAMOND</span>
              <span className="text-[0.6rem] font-bold tracking-[0.3em] text-brand-accent/80 uppercase">Detailing</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0f1115]/50 rounded-full p-1.5 border border-white/10 backdrop-blur-md shadow-lg">
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
                      className="absolute inset-0 bg-gradient-to-r from-brand-accent to-blue-600 rounded-full shadow-lg shadow-brand-accent/25"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {!isActive && (
                     <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                  )}
                  <span className={`relative z-10 transition-colors ${isActive ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA BUTTON - MODIFICAT (NEUTRU/VIZIBIL) */}
          <div className="hidden md:block">
             <a 
              href="#contact" 
              className="
                group relative inline-flex items-center gap-2 overflow-hidden rounded-xl 
                bg-white/10 /* Fundal mai vizibil, dar neutru */
                border border-white/20 /* Contur mai clar */
                backdrop-blur-md /* Efect de sticlă */
                px-6 py-2.5 text-sm font-bold text-white 
                transition-all duration-300
                hover:bg-white/20 /* La hover se face un alb mai intens (nu albastru) */
                hover:border-white/40 
                hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] /* Glow alb */
                active:scale-95
              "
            >
              <span className="relative z-10">Programează-te</span>
            </a>
          </div>

          {/* MOBILE BURGER */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              aria-label="Deschide meniul" 
              className="p-2.5 text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95"
            >
              <Menu className="h-6 w-6" />
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
              className="fixed inset-0 z-[59] bg-black/80 backdrop-blur-sm"
            />
            
            {/* Side Drawer */}
            <motion.div
              key="mobile-menu" 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[60] bg-[#0B0B0F] border-l border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Carbon Pattern Background */}
              <div className="absolute inset-0 z-0 opacity-[0.04]" 
                   style={{ 
                     backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 12px)',
                     backgroundSize: '100% 100%' 
                   }}>
              </div>

              <div className="relative z-10 flex flex-col h-full p-6">
                
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-accent/10 rounded-lg">
                        <Gem className="h-5 w-5 text-brand-accent" />
                      </div>
                      <span className="font-bold text-lg text-white tracking-wide">MENIU</span>
                   </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    aria-label="Închide meniul" 
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-3">
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
                        className={`text-lg font-medium px-5 py-4 rounded-xl transition-all flex items-center justify-between border ${
                          isActive 
                            ? 'bg-brand-accent/10 border-brand-accent/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'
                        }`}
                      >
                        {link.label}
                        {isActive && <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
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
                    className="p-6 rounded-2xl bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 text-center relative overflow-hidden"
                  >
                    {/* Background glow in card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 blur-[50px] rounded-full pointer-events-none" />
                    
                    <h4 className="relative z-10 text-gray-200 text-sm mb-4 font-medium">Mașina ta merită ce e mai bun.</h4>
                    <a 
                      href="#contact" 
                      onClick={() => setIsMenuOpen(false)}
                      className="relative z-10 block w-full rounded-xl bg-brand-accent py-3.5 text-base font-bold text-white shadow-lg shadow-brand-accent/20 transition-transform active:scale-95 hover:bg-blue-600"
                    >
                      Programează acum
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