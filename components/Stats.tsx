'use client';

import { CarFront, SprayCan, Gem } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    icon: <SprayCan className="h-8 w-8 text-brand-accent" />,
    value: "Produse pro",
    label: "Descriere",
  },
  {
    icon: <CarFront className="h-8 w-8 text-brand-accent" />,
    value: "+400",
    label: "Mașini care au plecat din atelier",
  },
  {
    icon: <Gem className="h-8 w-8 text-brand-accent" />,
    value: "Atenție la detalii",
    label: "Nu ne grăbim",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
  visible: { 
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { type: "spring" as const, bounce: 0.4, duration: 1.5 } 
  }
};

const Stats = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = container.children[0].clientWidth;
        const gap = 16;
        
        const scrollPos = 
          (cardWidth + gap) * 1 - 
          (container.clientWidth / 2) + 
          (cardWidth / 2);

        container.scrollTo({
          left: scrollPos,
          behavior: 'instant',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current && isClickScrolling.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].clientWidth;
      const gap = 16;
      
      const scrollPos = 
        (cardWidth + gap) * activeIndex - 
        (container.clientWidth / 2) + 
        (cardWidth / 2);

      container.scrollTo({
        left: scrollPos,
        behavior: 'smooth',
      });
      
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 500);
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (isClickScrolling.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0].clientWidth + 16; 
    
    const newIndex = Math.round((scrollLeft + (container.clientWidth / 2) - (cardWidth / 2)) / cardWidth);

    if (newIndex >= 0 && newIndex < statsData.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleDotClick = (index: number) => {
    isClickScrolling.current = true;
    setActiveIndex(index);
  };

  return (
    <section className="relative bg-brand-dark py-24 overflow-hidden">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-accent/5 blur-[120px]" />
         <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-[100px]" />
      </div>

      <motion.div 
        className="relative mx-auto max-w-7xl px-0 md:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 hide-scrollbar md:grid md:grid-cols-3 md:gap-8 md:px-0 md:pb-0"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              animate={{
                scale: index === activeIndex ? 1 : 0.95,
                opacity: index === activeIndex ? 1 : 0.5,
              }}
              className={`
                flex-shrink-0 w-[85vw] snap-center 
                group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white/5 p-10 text-center border border-white/5 backdrop-blur-md shadow-2xl
                md:w-auto md:flex-shrink md:opacity-100 md:scale-100
                transition-all duration-500
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 shadow-inner ring-1 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-black group-hover:ring-brand-accent/50">
                {stat.icon}
              </div>

              <div className="relative z-10">
                <dt className="text-3xl font-extrabold tracking-tight text-white mb-3 drop-shadow-lg">
                  {stat.value}
                </dt>
                <dd className="text-base font-light leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </dd>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-4 md:hidden">
          {statsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                h-3 rounded-full transition-all duration-500 
                ${index === activeIndex ? 'w-8 bg-brand-accent shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'w-3 bg-white/20 hover:bg-white/40'}
              `}
              aria-label={`Mergi la slide ${index + 1}`}
            />
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default Stats;