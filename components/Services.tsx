'use client'; 

import { useState } from 'react';
import { Check, Star } from 'lucide-react'; // Am scos Sparkles din import
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// --- DATELE PACHETELOR ---
const servicesData = [
  {
    title: 'Refresh',
    subtitle: 'Perfect pentru întreținere lunară',
    price: '400',
    features: [
      'Detailing interior complet',
      'Curățare zona chederelor și balamale',
      'Ștergere praf',
      'Spǎlare exterioarǎ',
      'Dressing anvelope'
    ],
    isFeatured: false,
  },
  {
    title: 'Deep clean',
    subtitle: 'Scoate mizeria din tapițerie și dă luciu',
    price: '600',
    features: [
      'Tot ce include Pachetul Refresh',
      'Curățare motor',
      'Polish one-step',
      'Curățare profesională jante',
      'Tratament hidrofob parbriz',
    ],
    isFeatured: true,
  },
  {
    title: 'Reset total',
    subtitle: 'Transformare completă. Mașina va arăta ca nouă.',
    price: '800',
    features: [
      'Detailing interior & exterior complet',
      'Curățare motor & jante',
      'Polish 2 step',
      'Tratament ceramic pentru piele',
      'Igienizare cu ozon',
    ],
    isFeatured: false,
  },
];

// --- COMPONENTA CARD ---
const PricingCard = ({ service, onClick }: { service: typeof servicesData[0], onClick: () => void }) => (
  <div className={`
    group relative flex flex-col justify-between h-full rounded-3xl p-8 
    transition-all duration-300 overflow-hidden
    ${service.isFeatured 
      ? 'bg-white/10 ring-2 ring-brand-accent shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] z-10' 
      : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/[0.07]'
    }
  `}>
    
    {/* Efect de strălucire la hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 via-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {service.isFeatured && (
      <>
        {/* Eticheta Recomandat */}
        <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 rounded-full bg-brand-accent text-xs font-bold text-white shadow-lg flex items-center justify-center gap-1 z-20">
          <Star size={12} fill="white" /> RECOMANDAT
        </div>
        {/* Glow dinamic */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-accent/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-brand-accent/30 transition-colors" />
      </>
    )}

    <div className="relative z-10">
      <div className="flex justify-between items-start">
        <h3 className={`text-2xl font-bold ${service.isFeatured ? 'text-white' : 'text-gray-100'}`}>
          {service.title}
        </h3>
        {/* Am scos Sparkles de aici */}
      </div>
      
      <p className="mt-2 text-sm text-gray-400 min-h-[40px] leading-relaxed">{service.subtitle}</p>
      
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-extrabold text-white tracking-tight">{service.price}</span>
        <span className="text-sm font-semibold text-gray-400">RON</span>
      </div>

      <div className="mt-8 h-px w-full bg-white/10" />

      <ul className="mt-8 space-y-4 text-sm text-gray-300">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <div className={`mt-0.5 rounded-full p-0.5 ${service.isFeatured ? 'bg-brand-accent/20' : 'bg-white/10'}`}>
              <Check className={`h-3.5 w-3.5 ${service.isFeatured ? 'text-brand-accent' : 'text-gray-400'}`} />
            </div>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <button
      onClick={onClick}
      className={`relative z-10 mt-8 w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-300 active:scale-95
        ${service.isFeatured 
          ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/25 hover:bg-blue-500 hover:shadow-brand-accent/40' 
          : 'bg-white/10 text-white hover:bg-white/20 hover:text-white'
        }
      `}
    >
      Vreau pachetul ăsta
    </button>
  </div>
);

// --- COMPONENTA PRINCIPALĂ ---
const Services = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);

  const handleSelectPackage = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    const newUrl = `${window.location.pathname}#contact?service=${encodeURIComponent(serviceTitle)}`;
    window.history.pushState({}, '', newUrl);

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('serviceSelected', { 
            detail: { service: serviceTitle } 
        }));
    }, 100);
  };

  return (
    <section id="servicii" className="relative bg-[#0B0B0F] py-20 lg:py-32 overflow-hidden">
      
      {/* 1. BACKGROUND TEXTURE (Carbon Fiber / Diagonal Lines) */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 12px)',
             backgroundSize: '100% 100%' 
           }}>
      </div>
      
      {/* 2. VIGNETTE (Estompare margini) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B0B0F] via-transparent to-[#0B0B0F]" />

      {/* 3. LUMINI AMBIENTALE - Mai difuze */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header Text */}
        <div className="mx-auto max-w-4xl text-center mb-10 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              Alege ce i se potrivește <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">mașinii tale</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base lg:text-lg leading-relaxed text-gray-400">
              Fără costuri ascunse. Folosim doar soluții de top și nu ne grăbim. <br className="hidden md:block"/> Calitatea cere timp.
            </p>
          </motion.div>
        </div>

        {/* --- MOBIL (TABS) --- */}
        <div className="lg:hidden">
          <div className="flex p-1.5 mb-8 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
            {servicesData.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300
                  ${activeTab === index 
                    ? 'bg-brand-accent text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {service.title}
              </button>
            ))}
          </div>

          <div className="relative min-h-[550px]"> 
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PricingCard 
                  service={servicesData[activeTab]} 
                  onClick={() => handleSelectPackage(servicesData[activeTab].title)} 
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- DESKTOP (GRID) --- */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={index === 1 ? 'lg:-mt-4 lg:mb-4' : ''}
            >
              <PricingCard 
                service={service} 
                onClick={() => handleSelectPackage(service.title)} 
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;