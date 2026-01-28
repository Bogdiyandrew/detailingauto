// app/components/Footer.tsx
import Link from 'next/link';
import { Instagram } from 'lucide-react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        
        {/* ZONA DE ICONIȚE */}
        <div className="flex justify-center space-x-8 md:order-2">
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/_diamond.detailing._/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <span className="sr-only">Instagram</span>
            {/* Lucide merge de obicei bine fără '!', dar poți pune și aici pt siguranță */}
            <Instagram className="!h-5 !w-5" />
          </a>

          {/* TikTok */}
          <a 
            href="https://www.tiktok.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <span className="sr-only">TikTok</span>
            {/* Aici folosim !h-6 !w-6 ca să forțăm dimensiunea */}
            <FontAwesomeIcon icon={faTiktok} className="!h-5 !w-5" />
          </a>
          
          {/* WhatsApp */}
          <a 
            href="https://wa.me/407xxxxxxxx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <span className="sr-only">WhatsApp</span>
            {/* Aici folosim !h-6 !w-6 ca să forțăm dimensiunea */}
            <FontAwesomeIcon icon={faWhatsapp} className="!h-5 !w-5" />
          </a>

        </div>
        
        {/* COPYRIGHT */}
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Diamond Detailing. Toate drepturile rezervate.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;