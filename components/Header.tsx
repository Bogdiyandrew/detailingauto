// app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#galerie', label: 'Galerie' },
    { href: '#servicii', label: 'Servicii' },
    { href: '#recenzii', label: 'Recenzii' },
  ];

  // === AICI ESTE FUNCȚIA NOUĂ ===
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevenim saltul brusc al link-ului #
    window.scrollTo({
      top: 0, // Ne ducem la coordonata 0 (sus de tot)
      behavior: 'smooth', // Forțăm comportamentul de scroll lin
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-white">
          {/* Logo - Am adăugat onClick */}
          <Link href="#" className="text-xl font-bold tracking-wider" onClick={handleLogoClick}>
            DIAMOND <span className="text-brand-accent">DETAILING</span>
          </Link>

          {/* Navigație Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-accent transition-colors">
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className="rounded-md bg-brand-accent px-4 py-2 text-center font-semibold text-white shadow-sm hover:bg-sky-400 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Buton Meniu Mobil */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Deschide meniul">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Meniu Overlay pentru Mobil */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col items-center justify-center gap-8 h-full text-white text-xl font-semibold">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-brand-accent transition-colors">
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 rounded-md bg-brand-accent px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-sky-400 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;