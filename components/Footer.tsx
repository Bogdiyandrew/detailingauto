// app/components/Footer.tsx
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import WhatsappIcon from './icons/WhatsappIcon';

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="https://www.instagram.com/_diamond.detailing._/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-gray hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent p-1"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          
          <a 
            href="https://wa.me/40751201507"
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-gray hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent p-1"
          >
            <span className="sr-only">WhatsApp</span>
            <WhatsappIcon className="h-6 w-6" />
          </a>
        </div>
        
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