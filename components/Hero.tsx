'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

// --- Componenta pentru text animat cuvânt cu cuvânt ---
const AnimatedText = ({ text, className, isMobile, delay = 0 }: { text: string, className?: string, isMobile: boolean, delay?: number }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: delay 
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20, 
      filter: isMobile ? "blur(0px)" : "blur(10px)", 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start", padding: "5px 0" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] last:mr-0 inline-block py-1">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Componenta Principală Hero ---
const Hero = () => {
  const targetRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "0%" : "50%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, isMobile ? 1 : 1.1]);

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 1.2, duration: 0.8, ease: "easeOut" } 
    }
  };

  const subtitleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: isMobile ? "blur(0px)" : "blur(5px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        delay: 0.8, 
        duration: 1, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section 
      ref={targetRef} 
      className="relative flex min-h-[100dvh] flex-col justify-center items-center md:items-start overflow-hidden bg-brand-dark pb-10 pt-20 md:pb-0 md:pt-0"
    >
      {/* Background Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/HERODESK.jpeg"
          alt="Interior auto curățat profesional"
          fill
          className="hidden object-cover md:block"
          priority
          quality={90}
          sizes="100vw"
        />
        <Image
          src="/HEROMOB.jpeg"
          alt="Interior auto curățat profesional"
          fill
          className="block object-cover object-bottom md:hidden"
          priority
          quality={70} 
          sizes="100vh"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/90" />
      </motion.div>

      {/* MODIFICARE 1: mt-12 pe mobil (în loc de -5vh) 
         Asta împinge conținutul mai jos, sub zona de logo/header 
      */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-16 lg:px-24 mx-auto mt-12 md:mt-0">
        
        <div className="flex flex-col items-center md:items-start max-w-4xl">
          
          <div className="mb-6 md:mb-8 w-full flex flex-col items-center md:items-start">
            <div className="relative z-10 w-full">
              <AnimatedText 
                text="Mașina ta, din nou" 
                isMobile={isMobile}
                className="text-3xl font-medium tracking-wide text-white/90 md:text-6xl lg:text-7xl mb-[-5px] md:mb-[-15px] w-full"
              />
            </div>
            
            <div className="relative w-full text-center md:text-left">
              {/* Glow Effect */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5, duration: 1.5 }}
                 className="absolute left-1/2 md:left-1/3 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-[50px] md:blur-[60px]"
              />

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { delay: 0.4, duration: 0.8, type: "spring", bounce: 0.4 } 
                }}
                viewport={{ once: true }}
                className="text-5xl xs:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-300 to-sky-600 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] md:drop-shadow-[0_0_25px_rgba(14,165,233,0.4)] py-2 md:py-4 leading-[1.1]"
              >
                CA ÎN PRIMA ZI
              </motion.h1>
            </div>
          </div>

          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-4 w-full"
          >
            {/* MODIFICARE 2: Linia este 'hidden' pe mobil și 'block' pe desktop */}
            <div className="hidden md:block h-[2px] w-12 bg-sky-500/50" />
            
            <p className="mb-6 md:mb-8 max-w-xl text-base md:text-xl font-light leading-relaxed text-slate-300 text-center md:text-left">
              Detailing auto profesional în <span className="text-white font-medium">Pitești</span>. 
              Curățare în profunzime, polish și protecție ceramică.
            </p>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            // MODIFICARE 3: mt-8 pentru o spațiere corectă față de text
            className="mt-8 md:mt-0 flex flex-col w-full sm:w-auto items-center justify-center gap-4 sm:flex-row md:justify-start"
          >
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                href="/#contact"
                className="group w-full sm:w-auto justify-center relative flex items-center gap-2 overflow-hidden rounded-full bg-brand-accent px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-accent/20 transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-brand-accent/40 focus:outline-none focus:ring-4 focus:ring-brand-accent/30"
                >
                <span className="relative z-10">Programează-te</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
                </Link>

                <Link
                href="/#servicii"
                className="group w-full sm:w-auto justify-center flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                Descoperă serviciile
                </Link>
            </div>

            {/* Social Icons - DOAR PENTRU MOBIL - integrate sub butoane */}
            <div className="flex gap-4 mt-4 md:hidden">
                 <a 
                  href="https://wa.me/40xxxxxx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all active:scale-95"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
                </a>
                
                <a 
                  href="https://www.tiktok.com/@_.diamond.detailing._" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all active:scale-95"
                >
                  <FontAwesomeIcon icon={faTiktok} className="h-4 w-4" />
                </a>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Social Icons - DOAR PENTRU DESKTOP - Poziționare absolută */}
      <motion.div 
        className="hidden md:flex absolute bottom-10 left-10 z-20 gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      >
        <a 
          href="https://wa.me/40xxxxxx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
        </a>
        
        <a 
          href="https://www.tiktok.com/@_.diamond.detailing._" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-black hover:border-white/20 hover:scale-110"
        >
          <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;