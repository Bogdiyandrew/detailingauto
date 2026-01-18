'use client'; 

import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const servicesData = [
  {
    title: 'Pachet1',
    subtitle: '-',
    price: '300',
    features: [
      '-',
      '-',
      '-',
      '-',
      '-',
    ],
    isFeatured: false,
  },
  {
    title: 'Pachet2',
    subtitle: '-',
    price: '400',
    features: [
      '-',
      '-',
      '-',
      '-',
      '-',
    ],
    isFeatured: true,
  },
  {
    title: 'Pachetul 3etc',
    subtitle: '-',
    price: '200',
    features: [
      '-',
      '-',
      '-',
      '-',
      '-',
    ],
    isFeatured: false,
  },
];

const Services = () => {
  const router = useRouter();
  
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
    <section id="servicii" className="relative bg-brand-dark py-24 overflow-hidden">
      
      {/* Background Animation - "Moving Blobs" */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Alege ce i se potrivește <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">mașinii tale</span>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Fără costuri ascunse. Folosim doar soluții de top și nu ne grăbim. Calitatea cere timp.
          </p>
        </div>

        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`
                relative flex flex-col justify-between rounded-3xl p-8 xl:p-10 transition-all duration-300
                ${service.isFeatured 
                  ? 'bg-white/10 ring-2 ring-brand-accent shadow-2xl shadow-brand-accent/20 scale-100 lg:scale-105 z-10' 
                  : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20'
                }
              `}
            >
              {service.isFeatured && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-40 rounded-full bg-gradient-to-r from-brand-accent to-blue-600 px-3 py-1 text-center text-sm font-bold text-white shadow-lg flex items-center justify-center gap-1">
                  <Star size={14} fill="white" />
                  Recomandat
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className={`text-xl font-bold leading-8 ${service.isFeatured ? 'text-white' : 'text-gray-100'}`}>
                    {service.title}
                  </h3>
                </div>
                
                <p className="mt-4 text-sm leading-6 text-gray-400">
                  {service.subtitle}
                </p>
                
                <p className="mt-6 flex items-baseline gap-x-1">
                  {/* Aici am scos span-ul cu "de la" */}
                  <span className={`text-4xl font-bold tracking-tight ${service.isFeatured ? 'text-white' : 'text-gray-100'}`}>
                    {service.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-400">RON</span>
                </p>

                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-x-3">
                      <Check className={`h-6 w-5 flex-none ${service.isFeatured ? 'text-brand-accent' : 'text-gray-500'}`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPackage(service.title)}
                className={`
                  mt-8 block w-full rounded-xl py-3 px-3 text-center text-sm font-bold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300
                  ${service.isFeatured
                    ? 'bg-brand-accent text-white hover:bg-blue-500 shadow-lg shadow-brand-accent/25 focus-visible:outline-brand-accent hover:scale-105 cursor-pointer'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                  }
                `}
              >
                Vreau pachetul ăsta
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;