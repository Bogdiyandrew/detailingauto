// app/components/Stats.tsx

import { Car, ShieldCheck, Star } from 'lucide-react';

const statsData = [
  {
    icon: <Car size={40} className="mb-4 text-brand-accent" />,
    value: "+200",
    label: "Autoturisme Igienizate",
  },
  {
    icon: <ShieldCheck size={40} className="mb-4 text-brand-accent" />,
    value: "Produse Profesionale",
    label: "Folosim doar soluții de top, sigure pentru mașina ta.",
  },
  {
    icon: <Star size={40} className="mb-4 text-brand-accent" />,
    value: "Atenție la Detaliu",
    label: "Pasiunea noastră este perfecțiunea în fiecare centimetru.",
  },
];

const Stats = () => {
  return (
    // We add overflow-hidden to the main section to prevent any horizontal scroll
    <section id="stats" className="bg-slate-100 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* The card itself also gets overflow-hidden to contain the blurred effect */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="px-6 py-16 text-center sm:px-16">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {statsData.map((stat, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                  {stat.icon}
                  <dt className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-brand-gray">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative blurred element */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[50rem] bg-gradient-to-tr from-[#00bfff] to-[#90e0ef] opacity-30"
              style={{
                clipPath: 'circle(50% at 50% 50%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;