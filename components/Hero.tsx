'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

const AnimatedText = ({ text, className, isMobile, delay = 0 }: { text: string, className?: string, isMobile: boolean, delay?: number }) => {
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
    hidden: {
      opacity: 0,
      y: 15, 
      filter: isMobile ? "none" : "blur(10px)", 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "none",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: isMobile ? "center" : "flex-start", 
        padding: "5px 0",
        transform: "translateZ(0)"
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          className="mr-[0.25em] last:mr-0 inline-block py-1 drop-shadow-md"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const targetRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); 
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setIsLoaded(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "0%" : "40%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, isMobile ? 1 : 1.05]);

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
      className="relative flex min-h-[100dvh] flex-col justify-center items-center md:items-start overflow-hidden bg-brand-dark pb-10 pt-20 md:pb-0 md:pt-0"
    >
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {!isMobile && isLoaded && (
          <Image
            src="/HERODESK.jpeg"
            alt="Interior auto curățat profesional"
            fill
            className="hidden object-cover md:block"
            priority
            quality={85}
            sizes="100vw"
          />
        )}

        {isMobile && isLoaded && (
          <div className="relative h-full w-full md:hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center"
            >
              <source src="/videotel.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/45 z-[1]" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/30 md:to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/95 z-[2]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-16 lg:px-24 mx-auto mt-6 md:mt-0">
        <div className="flex flex-col items-center md:items-start max-w-4xl">
          
          <div className="mb-6 md:mb-8 w-full flex flex-col items-center md:items-start">
            <div className="relative z-10 w-full">
              <AnimatedText 
                text="Mașina ta, din nou" 
                isMobile={isMobile}
                className="text-3xl font-medium tracking-wide text-white md:text-6xl lg:text-7xl mb-[-5px] md:mb-[-15px] w-full drop-shadow-lg"
              />
            </div>
            
            <div className="relative w-full text-center md:text-left">
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="absolute left-1/2 md:left-1/3 top-1/2 -z-10 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-[50px] md:blur-[80px]"
              />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.3, duration: 0.6 } 
                }}
                viewport={{ once: true }}
                className="text-4xl xs:text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-400 drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)] py-2 md:py-4 leading-[1.1]"
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
            <p className="mt-6 mb-8 md:mb-10 max-w-xl text-base md:text-xl font-normal leading-relaxed text-white drop-shadow-md text-center md:text-left">
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
            {/* Secțiunea butoane: flex-col pe mobil (unul sub altul) și flex-row pe desktop */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-fit md:w-full">
                <Link
                  href="/#contact"
                  className="group w-fit min-w-[220px] justify-center relative flex items-center gap-2 overflow-hidden rounded-full bg-sky-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-sky-900/20 transition-all active:scale-95"
                >
                  <span className="relative z-10">Programează-te</span>
                  <ArrowRight className="relative z-10 h-5 w-5" />
                </Link>

                <Link
                  href="/#servicii"
                  className="group w-fit min-w-[220px] justify-center flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all active:scale-95"
                >
                  Servicii
                </Link>
            </div>

            <div className="flex gap-10 mt-10 md:hidden">
                 <a href="https://wa.me/407xxxxxxxx" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm active:scale-90 shadow-lg">
                  <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
                </a>
                <a href="https://www.tiktok.com/@_.diamond.detailing._" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm active:scale-90 shadow-lg">
                  <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
                </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="hidden md:flex absolute bottom-10 left-10 z-20 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a href="https://wa.me/40773940475" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-[#25D366] hover:scale-110">
          <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
        </a>
        <a href="https://www.tiktok.com/@_.diamond.detailing._" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110">
          <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;