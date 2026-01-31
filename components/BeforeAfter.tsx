'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react'; 

// --- DATELE PENTRU SLIDER ---
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

// --- COMPONENTA SLIDER INDIVIDUALĂ ---
const ComparisonSlider = ({ before, after, title, description }: { before: string, after: string, title: string, description: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Funcția care calculează poziția
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
  
  // Mouse move (Desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  
  // Touch move (Mobil) - funcționează direct
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Oprește dragging-ul global dacă utilizatorul dă drumul la mouse în afara elementului
  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDragging);
    return () => window.removeEventListener('mouseup', stopDragging);
  }, []);

  return (
    <div className="flex flex-col gap-6 relative z-10">
      <div 
        // FIX CRITIC: 'touch-none' previne scroll-ul paginii când dai cu degetul pe slider
        className="relative h-[300px] w-full select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-[450px] group touch-none"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        // onTouchStart asigură că sliderul "sare" la deget din prima atingere
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* Imaginea DUPĂ (Fundal) */}
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

        {/* Imaginea ÎNAINTE (Deasupra, decupată) */}
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

        {/* Linia Verticală și Butonul */}
        <div 
          className="absolute inset-y-0 z-20 w-1 cursor-ew-resize bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-accent shadow-xl ring-4 ring-black/10 transition-transform group-hover:scale-110">
            <ChevronsLeftRight size={24} />
          </div>
        </div>

        {/* Indicator vizual pentru utilizatori (dispare la interacțiune) */}
        <div className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 transform transition-all duration-500 ${sliderPosition !== 50 || isDragging ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="rounded-full bg-black/60 border border-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md shadow-lg">
            Trage stânga-dreapta
          </span>
        </div>
      </div>

      {/* Descrierea sub slider */}
      <div className="text-center md:text-left px-2">
        <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
          {title}
        </h3>
        <p className="mt-2 text-gray-400 leading-relaxed text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

// --- SECȚIUNEA PRINCIPALĂ (WRAPPER) ---
const BeforeAfter = () => {
  return (
    <section id="galerie" className="relative bg-[#0B0B0F] py-32 overflow-hidden">
      
      {/* 1. GRID PATTERN */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>

      {/* 2. VIGNETTE */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B0B0F] via-transparent to-[#0B0B0F]" />

      {/* 3. ACCENT GLOWS */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 4. CONȚINUT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6"
          >
            Muncă pe bune, <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-brand-accent to-blue-600 blur-2xl opacity-30"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">fără filtre.</span>
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-8 text-gray-400"
          >
            Uite cum arată o mașină care a trecut pe la noi. Nu edităm pozele, lăsăm rezultatul să vorbească de la sine. 
          </motion.p>
        </div>

        {/* Lista de Slidere */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
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