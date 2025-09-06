'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } as const
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } as const
    },
  };

  return (
    <section className="relative flex h-screen items-center justify-center text-center text-white">
      {/* Imaginea de fundal pentru Desktop (Metoda Corectă) */}
      <Image
        src="/hero-desktop.webp"
        alt="Interior auto curățat profesional - vedere largă"
        fill
        className="hidden object-cover md:block"
        priority
        quality={90}
      />

      {/* Imaginea de fundal pentru Mobil (Metoda Corectă) */}
      <Image
        src="/hero-mobile.webp"
        alt="Volan și consolă centrală curățate în detaliu"
        fill
        className="block object-cover md:hidden"
        priority
        quality={80}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20">
        <motion.h1 
          className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Redă Strălucirea de <span className="text-brand-accent">Diamant</span> Mașinii Tale
        </motion.h1>
        
        <motion.p 
          className="mx-auto mb-8 max-w-2xl text-base font-light text-brand-gray md:text-lg"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" } as const}
        >
          Servicii de detailing auto premium în Pitești. Peste 200 de clienți mulțumiți ne recomandă.
        </motion.p>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
            <Link
              href="/#contact"
              className="inline-block rounded-md border border-brand-accent bg-brand-accent/10 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-brand-accent/20 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              Programează-te Acum
            </Link>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,100 L50,0 L100,100 Z" className="fill-current text-brand-light" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;