'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

const AnimatedText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`${className} flex flex-wrap justify-center md:justify-start w-full`}
    >
      {words.map((word, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          className="mr-[0.25em] last:mr-0 inline-block py-1 drop-shadow-md will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const targetRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 1, duration: 0.5 } 
    }
  };

  return (
    <section 
      ref={targetRef} 
      className="relative flex min-h-[100dvh] flex-col justify-center items-center md:items-start overflow-hidden bg-black pb-10 pt-20 md:pb-0 md:pt-0"
    >
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* Video Background activ pe ambele (Mobile + Desktop) */}
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/mobile.jpeg"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/vdtel.mp4" type="video/mp4" />
          </video>
          
          {/* Strat de întunecare pentru contrast */}
          <div className="absolute inset-0 bg-black/40 z-[1]" />
        </div>

        {/* Gradiente pentru lizibilitate (Varianta A: Cinematic) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent hidden md:block z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 z-[2]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-16 lg:px-24 mx-auto mt-6 md:mt-0">
        <div className="flex flex-col items-center md:items-start max-w-4xl">
          
          <div className="mb-5 md:mb-8 w-full flex flex-col items-center md:items-start">
            <AnimatedText 
              text="Mașina ta, din nou" 
              className="text-3xl font-medium tracking-wide text-white md:text-6xl lg:text-7xl mb-[-5px] md:mb-[-15px] drop-shadow-lg"
            />
            
            <div className="relative w-full text-center md:text-left">
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="absolute left-1/2 md:left-0 top-1/2 -z-10 h-[100%] w-[100%] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 rounded-full bg-sky-500/20 blur-[60px] md:blur-[100px]"
              />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.3, duration: 0.6 } 
                }}
                viewport={{ once: true }}
                className="text-4xl xs:text-5xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-400 drop-shadow-xl py-2 md:py-4 leading-[1.1]"
              >
                CA ÎN PRIMA ZI
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-4 w-full"
          >
            <div className="hidden md:block h-[2px] w-12 bg-sky-500/50" />
            <p className="mt-6 mb-8 md:mb-10 max-w-xl text-base md:text-xl font-light leading-relaxed text-gray-100 drop-shadow-md text-center md:text-left px-4 md:px-0">
              Detailing auto profesional în <span className="text-sky-400 font-bold">Pitești</span>. 
              Curățare în profunzime, polish și protecție ceramică.
            </p>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 flex flex-col w-full items-center justify-center md:items-start"
          >
            <div className="mt-5 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 w-full md:w-fit">
                <Link
                  href="/#contact"
                  className="group w-fit min-w-[220px] justify-center relative flex items-center gap-2 overflow-hidden rounded-full bg-sky-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-sky-900/20 transition-all active:scale-95 hover:bg-sky-500"
                >
                  <span className="relative z-10">Programează-te</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/#servicii"
                  className="group w-fit min-w-[220px] justify-center flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all active:scale-95 hover:bg-white/10"
                >
                  Servicii
                </Link>
            </div>

            <div className="flex gap-10 mt-10 md:hidden relative z-10">
                 <a href="https://wa.me/40773940475" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm active:scale-90 shadow-lg">
                  <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
                </a>
                <a href="https://www.tiktok.com/@_.diamond.detailing._" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm active:scale-90 shadow-lg">
                  <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
                </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="hidden md:flex absolute bottom-10 right-10 z-20 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a href="https://wa.me/40773940475" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-[#25D366] hover:scale-110">
          <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
        </a>
        <a href="https://www.tiktok.com/@_.diamond.detailing._" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110">
          <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;