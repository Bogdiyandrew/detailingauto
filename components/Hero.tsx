'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

// Componentă pentru titlul principal (păstrăm efectul cuvânt cu cuvânt AICI, dar reparăm diacriticele)
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
      // MODIFICARE: Am scos 'overflow: hidden' și am adăugat padding pentru a nu tăia diacriticele (î, ș, ț)
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "5px 0" }}
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

  // MODIFICARE: Variante pentru subtitlu (animație în bloc, tot odată)
  const subtitleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: isMobile ? "blur(0px)" : "blur(5px)" // Blur mai subtil la subtitlu
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        delay: 0.8, // Apare după titlu
        duration: 1, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section ref={targetRef} className="relative flex h-dvh items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/hero-desktop.webp"
          alt="Interior auto curățat profesional"
          fill
          className="hidden object-cover md:block"
          priority
          quality={90}
          sizes="100vw"
        />
        <Image
          src="/hero-mobile.webp"
          alt="Interior auto curățat profesional"
          fill
          className="block object-cover md:hidden"
          priority
          quality={70} 
          sizes="100vh"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-brand-dark" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        <div className="mb-6 drop-shadow-2xl">
          {/* Titlu mic - rămâne cu efectul elegant cuvânt cu cuvânt */}
          <AnimatedText 
            text="Mașina ta, din nou" 
            isMobile={isMobile}
            className="text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl mb-2"
          />
          
          {/* Titlu Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: isMobile ? "blur(0px)" : "blur(10px)" }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              transition: { delay: 0.6, duration: 0.8 } 
            }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl bg-gradient-to-r from-brand-accent to-sky-500 bg-clip-text text-transparent block mt-2 md:mt-4 py-2"
          >
            CA ÎN PRIMA ZI
          </motion.h1>
        </div>

        {/* MODIFICARE: Subtitlu - Acum este un motion.p simplu, se mișcă TOT ODATĂ */}
        <motion.p 
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-xl py-1"
        >
          Detailing auto profesional în Pitești. Curățare în profunzime, polish și protecție ceramică la standarde de reprezentanță.
        </motion.p>
        
        {/* Butoane */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
      </div>

      <motion.div 
        className="absolute bottom-6 left-6 z-20 flex gap-4 md:bottom-10 md:left-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
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
          href="https://www.tiktok.com/@_.diamond.detailing._" 
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