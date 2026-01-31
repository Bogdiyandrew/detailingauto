// components/Footer.tsx
'use client';

import Link from 'next/link';
import { Gem, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1115] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Pattern subtil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* COLOANA 1: BRAND (4 coloane grid) */}
          <div className="lg:col-span-4">
            <Link href="#" className="flex items-center gap-2 mb-6 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent/10 border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                <Gem className="h-6 w-6 text-brand-accent group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-xl tracking-wider text-white">DIAMOND</span>
                <span className="text-[0.65rem] font-bold tracking-[0.3em] text-brand-accent uppercase">Detailing</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Redăm strălucirea mașinii tale prin servicii premium de detailing interior și exterior. Folosim tehnologie de ultimă oră și produse de top în Pitești.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://www.instagram.com/_.diamond.detailing._/" icon={faInstagram} label="Instagram" />
              <SocialLink href="https://www.tiktok.com/@_.diamond.detailing._" icon={faTiktok} label="TikTok" />
              <SocialLink href="https://wa.me/40700000000" icon={faWhatsapp} label="WhatsApp" />
              <SocialLink href="#" icon={faFacebook} label="Facebook" />
            </div>
          </div>

          {/* COLOANA 2: LINK-URI RAPIDE (2 coloane grid) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6">Navigare</h3>
            <ul className="space-y-3">
              <FooterLink href="#main-content">Acasă</FooterLink>
              <FooterLink href="#servicii">Servicii</FooterLink>
              <FooterLink href="#galerie">Galerie Foto</FooterLink>
              <FooterLink href="#recenzii">Recenzii</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* COLOANA 3: SERVICII (3 coloane grid) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6">Servicii Populare</h3>
            <ul className="space-y-3">
              <FooterLink href="#servicii">Curățare Interior</FooterLink>
              <FooterLink href="#servicii">Polish Caroserie</FooterLink>
              <FooterLink href="#servicii">Protecție Ceramică</FooterLink>
              <FooterLink href="#servicii">Recondiționare Faruri</FooterLink>
              <FooterLink href="#servicii">Igienizare Ozon</FooterLink>
            </ul>
          </div>

          {/* COLOANA 4: CONTACT (3 coloane grid) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6">Informații Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-accent mt-0.5 flex-shrink-0" />
                <span>Bl. Nicolae Bălcescu nr.92,<br />Pitești, Argeș</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-accent flex-shrink-0" />
                <a href="tel:+40700000000" className="hover:text-white transition-colors">07xx xxx xxx</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-accent flex-shrink-0" />
                <a href="mailto:contact@diamonddetailing.ro" className="hover:text-white transition-colors">contact@diamond.ro</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-accent mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>Luni - Vineri: 08:00 - 16:00</span>
                  <span>Sâmbătă: 09:00 - 14:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} Diamond Detailing Pitești. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-300 transition-colors">Termeni și condiții</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Politica de confidențialitate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <Link href={href} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-brand-accent transition-colors">
      <ChevronRight className="h-3 w-3 text-brand-accent/50 group-hover:text-brand-accent transition-colors" />
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: any, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300 transform hover:-translate-y-1"
  >
    <FontAwesomeIcon icon={icon} className="h-4 w-4" />
  </a>
);

export default Footer;