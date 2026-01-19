'use client';

import { CarFront, SprayCan, Gem } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const statsData = [
  {
    icon: <SprayCan className="h-8 w-8 text-brand-accent" />,
    value: "Produse pro",
    label: "Descriere",
  },
  {
    icon: <CarFront className="h-8 w-8 text-brand-accent" />,
    value: "+400",
    label: "Mașini finalizate",
  },
  {
    icon: <Gem className="h-8 w-8 text-brand-accent" />,
    value: "Atenție la detalii",
    label: "Nu ne grăbim",
  },
];

// Variante simplificate pentru a nu bloca render-ul inițial
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, // Am scos rotația și scale-ul complex pentru performanță
  visible: { 
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

const Stats = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Efect pentru centrarea inițială (Doar o dată)
  useEffect(() => {
    const centerCard = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const card = container.children[0] as HTMLElement;
        if (!card) return;

        const cardWidth = card.clientWidth;
        const gap = 16; // gap-4 din tailwind (1rem = 16px)
        
        // Calculăm poziția exactă pentru a centra cardul cu index 1
        const scrollPos = (cardWidth + gap) * 1 - (container.clientWidth / 2) + (cardWidth / 2);

        container.scrollTo({ left: scrollPos, behavior: 'instant' });
      }
    };

    // Folosim requestAnimationFrame pentru a fi siguri că DOM-ul e gata
    requestAnimationFrame(centerCard);
  }, []);

  // Optimizare scroll handler cu requestAnimationFrame
  const handleScroll = () => {
    if (isClickScrolling.current || !scrollContainerRef.current) return;

    if (scrollTimeout.current) return; // Debounce simplu

    scrollTimeout.current = setTimeout(() => {
      if(!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const card = container.children[0] as HTMLElement;
      const cardWidth = card.clientWidth + 16; // width + gap
      
      const newIndex = Math.round((scrollLeft + (container.clientWidth / 2) - (cardWidth / 2)) / cardWidth);

      // Actualizăm state-ul DOAR dacă s-a schimbat indexul (evităm re-render inutil)
      setActiveIndex((prev) => {
        if (newIndex >= 0 && newIndex < statsData.length && newIndex !== prev) {
          return newIndex;
        }
        return prev;
      });

      scrollTimeout.current = null;
    }, 50); // Calculăm la fiecare 50ms, nu la fiecare pixel
  };

  const handleDotClick = (index: number) => {
    isClickScrolling.current = true;
    setActiveIndex(index);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[0] as HTMLElement;
      const cardWidth = card.clientWidth + 16;
      
      const scrollPos = cardWidth * index - (container.clientWidth / 2) + (card.clientWidth / 2);

      container.scrollTo({
        left: scrollPos,
        behavior: 'smooth',
      });
      
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 500);
    }
  };

  return (
    <section className="relative bg-brand-dark py-24 overflow-hidden">
      {/* Background Decorativ */}
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
          className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 px-[50vw] md:px-0 pb-8 no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:pb-0"
          style={{ 
             // Hack pentru a permite centrarea primului element pe mobil folosind padding dinamic
             // Pe desktop padding-ul este resetat de clasa md:px-0
             paddingLeft: 'max(1.5rem, calc(50% - 42.5vw))', 
             paddingRight: 'max(1.5rem, calc(50% - 42.5vw))'
          }}
        >
          {statsData.map((stat, index) => {
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                // MODIFICARE MAJORĂ: Am scos 'animate={...}' care cauza lag-ul.
                // Folosim clase CSS condiționale pentru scale și opacity.
                className={`
                  flex-shrink-0 w-[85vw] snap-center snap-always
                  group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-10 text-center border backdrop-blur-md shadow-2xl
                  md:w-auto md:flex-shrink md:opacity-100 md:scale-100 md:bg-white/5 md:border-white/5
                  transition-all duration-500 ease-out will-change-transform
                  
                  /* Stiluri condiționale MOBILE (controlate de React State dar animate de CSS) */
                  ${isActive 
                    ? 'scale-100 opacity-100 bg-white/10 border-brand-accent/30 z-10' 
                    : 'scale-90 opacity-50 bg-white/5 border-white/5 z-0'
                  }
                `}
              >
                {/* Gradient Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className={`
                  relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-inner ring-1 transition-all duration-300 
                  ${isActive 
                    ? 'bg-black text-brand-accent ring-brand-accent/50 scale-110' 
                    : 'bg-white/5 text-gray-400 ring-white/10 group-hover:bg-black group-hover:text-brand-accent'
                  }
                `}>
                  {stat.icon}
                </div>

                <div className="relative z-10">
                  <dt className="text-3xl font-extrabold tracking-tight text-white mb-3 drop-shadow-lg">
                    {stat.value}
                  </dt>
                  <dd className={`text-base font-light leading-relaxed transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {stat.label}
                  </dd>
                </div>

                {/* Bottom Line Glow */}
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Dots Navigation */}
        <div className="flex justify-center gap-3 mt-2 md:hidden">
          {statsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                h-2 rounded-full transition-all duration-500 
                ${index === activeIndex ? 'w-8 bg-brand-accent shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'w-2 bg-white/20'}
              `}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

      </motion.div>
      
      {/* CSS Utility pentru ascundere scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Stats;