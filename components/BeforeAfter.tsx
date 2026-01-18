'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react'; 

const comparisons = [
  {
    before: '/before-1.jpg',
    after: '/after-1.jpg',
    title: 'Curățare interior', 
    description: 'Nu doar că am scos petele vizibile, dar am igienizat materialul în profunzime. Mașina se simte din nou proaspătă și curată.' 
  },
  {
    before: '/before-2.jpg',
    after: '/after-2.jpg',
    title: 'Restaurare faruri',
    description: 'Farurile mătuite nu sunt doar inestetice, ci și periculoase. Le-am redat transparența pentru ca tu să vezi clar drumul noaptea.' 
  },
];

const ComparisonSlider = ({ before, after, title, description }: { before: string, after: string, title: string, description: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDragging);
    return () => window.removeEventListener('mouseup', stopDragging);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div 
        className="relative h-[300px] w-full select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-[450px]"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <Image
          src={after}
          alt="Dupa detailing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4 z-10 rounded-full bg-brand-accent/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
          DUPĂ
        </div>

        <div 
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={before}
            alt="Inainte de detailing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
            ÎNAINTE
          </div>
        </div>

        <div 
          className="absolute inset-y-0 z-20 w-1 cursor-ew-resize bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-accent shadow-xl ring-4 ring-black/20">
            <ChevronsLeftRight size={20} />
          </div>
        </div>

        <div className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 transform transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-70'}`}>
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
            Trage stânga-dreapta
          </span>
        </div>
      </div>

      <div className="text-center md:text-left px-2">
        <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
          {title}
        </h3>
        <p className="mt-2 text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const BeforeAfter = () => {
  return (
    <section id="galerie" className="bg-brand-dark py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[600px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Muncă pe bune, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">fără filtre</span>.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-400"
          >
            Uite cum arată o mașină care a trecut pe la noi. Nu edităm pozele, lăsăm rezultatul să vorbească de la sine. Trage de slider stânga-dreapta.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
            >
              <ComparisonSlider {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;