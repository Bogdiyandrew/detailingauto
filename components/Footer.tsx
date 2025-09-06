// app/components/Footer.tsx
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import WhatsappIcon from './icons/WhatsappIcon'; // 1. Importăm noua iconiță

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        {/* Link-uri Social Media */}
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="https://www.instagram.com/_diamond.detailing._/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-gray hover:text-white transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          
          <a 
            href="https://wa.me/"
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-gray hover:text-white transition-colors"
          >
            <span className="sr-only">WhatsApp</span>
            {/* 2. Folosim noua componentă aici */}
            <WhatsappIcon className="h-6 w-6" />
          </a>
        </div>
        
        {/* Text Copyright */}
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-brand-gray">
            &copy; {new Date().getFullYear()} Diamond Detailing. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;