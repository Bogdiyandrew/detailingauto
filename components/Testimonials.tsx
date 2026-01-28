'use client';

import { useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    name: 'Marius D.',
    role: 'Client Verificat',
    text: 'Am dus mașina pentru pachetul 2 înainte să o pun la vânzare. Interiorul a ieșit impecabil. Recomand!',
    rating: 5,
    initials: 'MD'
  },
  {
    name: 'Andrei P.',
    role: 'BMW Seria 5',
    text: 'Lucru curat. La spălătoriile de cartier o fac în 15 minute, aici se vede diferența reală de calitate.',
    rating: 5,
    initials: 'AP'
  },
  {
    name: 'Sorin T.',
    role: 'Client Fidel',
    // Textul lung care cauza probleme
    text: 'Am făcut protecția ceramică acum 3 luni și pot spune că este o investiție excelentă. Mașina se spală mult mai ușor acum, mizeria nu se mai lipește, iar luciul este incredibil, exact ca în prima zi.',
    rating: 5,
    initials: 'ST'
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      // Ajustare fină pentru grid
      const index = Math.round(scrollPosition / (cardWidth * 0.7)); 
      const cleanIndex = Math.min(index, testimonialsData.length - 1);
      setActiveIndex(cleanIndex);
    }
  };

  return (
    <section id="recenzii" className="relative bg-brand-dark py-16 lg:py-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[800px] h-[300px] lg:h-[400px] bg-brand-accent/5 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-0 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-10 lg:mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-brand-accent backdrop-blur-sm border border-white/10 mb-6"
          >
            <Star size={14} className="fill-brand-accent" />
            Recenzii verificate
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            Nu ne crede pe noi. <br />
            <span className=" bg-clip-text text-blue-300">Crede-i pe ei.</span>
          </motion.h2>
        </div>

        {/* --- CARUSEL GRID (SOLUȚIA STABILĂ) --- */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            grid grid-flow-col                      /* Grid orizontal */
            auto-cols-[min(85vw,400px)] lg:grid-cols-3 lg:auto-cols-auto /* Lățime dinamică pe mobil, 3 col pe desktop */
            gap-4 lg:gap-8 
            overflow-x-auto snap-x snap-mandatory 
            px-6 py-8 /* Padding vertical generos ca să nu taie umbrele */
            scrollbar-hide
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="snap-center h-full"
            >
              <div className="
                relative flex flex-col justify-between h-full 
                rounded-3xl bg-white/5 p-8 border border-white/5 shadow-xl 
                hover:bg-white/10 transition-colors duration-300
              ">
                <Quote className="absolute top-6 right-8 text-white/5 h-12 w-12 rotate-180" />

                <div className="relative z-10 flex-grow mb-6">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* break-words previne bug-urile de lățime */}
                  <p className="text-base lg:text-lg leading-relaxed text-gray-300 italic break-words">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white shadow-lg border border-white/10">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
           {/* Spacer invizibil la final pentru mobile scroll */}
           <div className="w-2 lg:hidden" />
        </div>

        {/* --- DOTS --- */}
        <div className="flex justify-center gap-2 lg:hidden mt-2">
          {testimonialsData.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 
                ${index === activeIndex ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20'}
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;