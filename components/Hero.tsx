'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } as const
    },
  };

  return (
    <section ref={targetRef} className="relative flex h-screen items-center justify-center overflow-hidden bg-brand-dark">
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-desktop.webp"
          alt="Interior auto curățat profesional"
          fill
          className="hidden object-cover md:block"
          priority
          quality={90}
        />
        <Image
          src="/hero-mobile.webp"
          alt="Interior auto curățat profesional"
          fill
          className="block object-cover md:hidden"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-brand-dark" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
        className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-2xl"
        variants={itemVariants}
      >
        Mașina ta, din nou <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-brand-accent to-sky-500 bg-clip-text text-transparent">
        CA ÎN PRIMA ZI
        </span>
</motion.h1>

<motion.p 
  className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-xl"
  variants={itemVariants}
>
  Detailing auto profesional în Pitești. Curățare în profunzime, polish și protecție ceramică la standarde de reprezentanță.
</motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/#contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-brand-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-accent/20 transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-brand-accent/40 focus:outline-none focus:ring-4 focus:ring-brand-accent/30"
          >
            <span className="relative z-10">Programează-te</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
          </Link>

          <Link
            href="/#servicii"
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
          >
            Descoperă serviciile
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-6 left-6 z-20 flex gap-4 md:bottom-10 md:left-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <a 
          href="https://wa.me/40xx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
          aria-label="Contactează-ne pe WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
        </a>
        
        <a 
          href="https://www.tiktok.com/@_diamond.detailing._" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-black hover:border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-white/10"
          aria-label="Urmărește-ne pe TikTok"
        >
          <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;