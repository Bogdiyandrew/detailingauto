'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const Lightbox = ({ src, alt, onClose }: LightboxProps) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-brand-accent transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        aria-label="Închide imaginea"
      >
        <X size={32} />
      </button>
    </div>
  );
};

export default Lightbox;