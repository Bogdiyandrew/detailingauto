'use client'; 

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const servicesData = [
  {
    title: 'Detailing Interior',
    subtitle: 'Curățare completă și igienizare',
    price: '350',
    features: [
      'Detailing interior complet',
      'info2',
      'info3',
      'info4',
    ],
    isFeatured: false,
  },
  {
    title: 'Pachetul Crystal',
    subtitle: 'Experiența Detailing Supremă',
    price: '1000',
    features: [
      'Detailing interior și exterior complet',
      'Polish exterior profesional',
      'info3',
      'info4',
      'info5',
    ],
    isFeatured: true,
  },
  {
    title: 'Polish & Ceramic',
    subtitle: 'Luciu Spectaculos și Protecție Durabilă',
    price: '700',
    features: [
      'info1',
      'info2',
      '3',
      '4',
    ],
    isFeatured: false,
  },
];

const Services = () => {
  const router = useRouter();
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSelectPackage = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    
    const newUrl = `${window.location.pathname}#contact?service=${encodeURIComponent(serviceTitle)}`;
    window.history.pushState({}, '', newUrl);

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.dispatchEvent(new CustomEvent('serviceSelected', { 
      detail: { service: serviceTitle } 
    }));
  };

  return (
    <section id="servicii" className="bg-brand-dark py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">Servicii și Prețuri</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pachete Create Pentru Nevoile Mașinii Tale
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-brand-gray">
          Indiferent de starea mașinii, avem un pachet care îi va reda strălucirea și o va proteja pe termen lung.
        </p>

        <div className="isolate mx-auto mt-20 grid max-w-md grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              // MODIFICARE: Am adăugat gap-y-6 aici pentru spațiere între elementele directe ale cardului
              // Am setat p-8 pentru un padding consistent în jurul conținutului
              className={`rounded-3xl p-8 ring-1 flex flex-col h-full transition-transform duration-300 gap-y-6 ${
                service.isFeatured
                  ? 'bg-white/5 ring-brand-accent lg:-translate-y-8'
                  : 'ring-white/10'
              }`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h3 className={`text-lg font-semibold leading-8 ${service.isFeatured ? 'text-brand-accent' : 'text-white'}`}>
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-brand-gray">{service.subtitle}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-sm font-semibold leading-6 text-brand-gray mr-1">De la</span>
                  <span className="text-4xl font-bold tracking-tight text-white">{service.price}</span>
                  <span className="text-sm font-semibold leading-6 text-brand-gray">RON</span>
                </p>
              </div>
              
              {/* MODIFICARE: Eliminat mt-8 de aici pentru că gap-y de pe părinte preia controlul */}
              <ul role="list" className="space-y-3 text-sm leading-6 text-brand-gray flex-grow"> 
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-brand-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* MODIFICARE: Eliminat mt-auto și mt-8. Butonul se va alinia jos automat în flex-col
                         și gap-y-6 (de pe părinte) îi va da spațiu deasupra. */}
              <button
                onClick={() => handleSelectPackage(service.title)}
                className={`w-full rounded-md py-2.5 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer ${
                  service.isFeatured
                    ? 'bg-brand-accent text-white shadow-sm hover:bg-sky-400 focus-visible:outline-brand-accent'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                }`}
              >
                Alege Pachetul
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;