'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '#galerie', label: 'Galerie' },
    { href: '#servicii', label: 'Servicii' },
    { href: '#recenzii', label: 'Recenzii' },
  ];
  
  const activeSection = useScrollSpy(['galerie', 'servicii', 'recenzii', 'contact']);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 30 } as const 
    },
    exit: { 
      x: '100%', 
      transition: { type: 'spring', stiffness: 300, damping: 30 } as const 
    },
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-dark/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-white">
          <Link href="#" className="text-xl font-bold tracking-wider rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" onClick={handleLogoClick}>
            DIAMOND <span className="text-brand-accent">DETAILING(+logo)</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent p-1 ${
                  `#${activeSection}` === link.href ? 'text-brand-accent' : 'hover:text-brand-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`rounded-md px-4 py-2 text-center font-semibold text-white shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark focus-visible:ring-white ${
                activeSection === 'contact' ? 'bg-sky-400' : 'bg-brand-accent hover:bg-sky-400'
              }`}
            >
              Contact
            </a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Deschide meniul" className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
              <Menu />
            </button>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[59] bg-black/60"
            />
            
            <motion.div
              key="mobile-menu" 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-[60] bg-brand-dark/95 backdrop-blur-lg shadow-2xl"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <span className="font-bold text-lg text-white">Meniu</span>
                  <button onClick={() => setIsMenuOpen(false)} aria-label="Închide meniul" className="text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                    <X />
                  </button>
                </div>
                <nav className="flex flex-col items-center justify-center gap-8 flex-grow text-white text-xl font-semibold">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-brand-accent transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent p-1">
                      {link.label}
                    </a>
                  ))}
                  <a 
                    href="#contact" 
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-4 rounded-md bg-brand-accent px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark focus-visible:ring-white"
                  >
                    Contact
                  </a>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;