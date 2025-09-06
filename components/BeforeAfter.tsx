// app/components/BeforeAfter.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'; // 1. Import the new hook

const beforeAfterImages = [
  {
    before: '/before-1.jpg',
    after: '/after-1.jpg',
    alt: 'Curățare interior auto',
    description: 'Detailing interior complet: de la murdărie la impecabil.',
  },
  {
    before: '/before-2.jpg',
    after: '/after-2.jpg',
    alt: 'Polish faruri pentru claritate maximă',
    description: 'Restaurarea farurilor: de la mat la claritate de cristal.',
  },
];

const BeforeAfter = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // 2. Use the hook. It will lock the body scroll whenever lightboxImage is not null.
  useLockBodyScroll(!!lightboxImage);

  return (
    <>
      <section id="galerie" className="bg-brand-light py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-accent">Transformări Uimitoare</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Vezi Rezultatele Înainte și După
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-brand-gray">
            Click pe oricare imagine pentru a o mări.
          </p>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {beforeAfterImages.map((item, index) => (
              <div key={index} className="flex flex-col rounded-xl overflow-hidden shadow-lg border border-brand-gray/10 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div 
                    className="relative aspect-square cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2" 
                    onClick={() => setLightboxImage(item.before)}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(item.before)}
                    tabIndex={0}
                  >
                    <Image src={item.before} alt={`${item.alt} - Înainte`} fill className="object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Înainte</div>
                  </div>

                  <div 
                    className="relative aspect-square cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2" 
                    onClick={() => setLightboxImage(item.after)}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(item.after)}
                    tabIndex={0}
                  >
                    <Image src={item.after} alt={`${item.alt} - După`} fill className="object-cover" />
                    <div className="absolute top-2 left-2 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">După</div>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-lg font-semibold leading-7 text-brand-dark">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxImage && (
        <Lightbox 
          src={lightboxImage} 
          alt="Imagine mărită" 
          onClose={() => setLightboxImage(null)} 
        />
      )}
    </>
  );
};

export default BeforeAfter;