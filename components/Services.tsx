// app/components/Services.tsx
import { Check } from 'lucide-react';
import Link from 'next/link'; // 1. Asigură-te că Link este importat

const servicesData = [
  {
    title: 'Detailing Interior',
    subtitle: 'Curățare completă și igienizare',
    price: '350',
    features: [
      'Detailing interior complet',
      'Curățare zonă chedere și balamale',
      'Igienizare profesională',
      'Finisaj impecabil pentru plastice și tapițerie',
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
      'Curățare compartiment motor, jante, carenaje',
      'Tratament ceramic cu garanție 2 ani',
      'Desfundare canale scurgere trapă',
    ],
    isFeatured: true,
  },
  {
    title: 'Polish & Ceramic',
    subtitle: 'Luciu Spectaculos și Protecție Durabilă',
    price: '700',
    features: [
      'Polish exterior pentru corecția vopselei',
      'Aplicare tratament ceramic profesional',
      'Garanție de 2 ani pentru protecție',
      'Efect hidrofob și rezistență la zgârieturi fine',
    ],
    isFeatured: false,
  },
];

const Services = () => {
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

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 ring-1 xl:p-10 ${
                service.isFeatured
                  ? 'bg-white/5 ring-brand-accent'
                  : 'ring-white/10'
              }`}
            >
              <h3 className={`text-lg font-semibold leading-8 ${service.isFeatured ? 'text-brand-accent' : 'text-white'}`}>
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-brand-gray">{service.subtitle}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-sm font-semibold leading-6 text-brand-gray mr-1">De la</span>
                <span className="text-4xl font-bold tracking-tight text-white">{service.price}</span>
                <span className="text-sm font-semibold leading-6 text-brand-gray">RON</span>
              </p>
              
              {/* === AICI ESTE MODIFICAREA === */}
              {/* Am înlocuit tag-ul <a> cu <Link> */}
              <Link
                href="/#contact"
                className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  service.isFeatured
                    ? 'bg-brand-accent text-white shadow-sm hover:bg-sky-400 focus-visible:outline-brand-accent'
                    // Aici am corectat o mică greșeală de stil
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                }`}
              >
                Alege Pachetul
              </Link>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-brand-gray xl:mt-10">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-brand-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;