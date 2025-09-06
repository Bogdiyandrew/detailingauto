// app/components/Stats.tsx

import { Car, ShieldCheck, Star } from 'lucide-react';

const statsData = [
  {
    icon: <ShieldCheck size={40} className="mb-4 text-brand-accent" />,
    value: "Produse Profesionale",
    label: "Folosim doar soluții de top, sigure pentru mașina ta.",
  },
  {
    icon: <Car size={40} className="mb-4 text-brand-accent" />,
    value: "+200",
    label: "Autoturisme Igienizate",
  },
  {
    icon: <Star size={40} className="mb-4 text-brand-accent" />,
    value: "Atenție la Detaliu",
    label: "Pasiunea noastră este perfecțiunea în fiecare centimetru.",
  },
];

const Stats = () => {
  return (
    <section id="stats" className="bg-slate-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative rounded-3xl shadow-2xl">
          
          {/* Glow-ul */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl z-0"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[50rem] bg-gradient-to-tr from-[#00bfff] to-[#90e0ef] opacity-50"
              style={{ clipPath: 'circle(50% at 50% 50%)' }}
            />
          </div>

          {/* Cardul cu date */}
          <div className="relative isolate overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl z-10">
            <div className="px-6 py-16 text-center sm:px-16">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;