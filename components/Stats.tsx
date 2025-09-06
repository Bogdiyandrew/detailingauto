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
    <section id="stats" className="bg-slate-100 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
          
          {/* Glow subtil */}
          <div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="h-64 w-64 rounded-full bg-blue-400 opacity-25 blur-[80px]" />
          </div>

          {/* Conținutul */}
          <div className="relative z-10 px-6 py-16 text-center sm:px-16">
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

        </div>
      </div>
    </section>
  );
};

export default Stats;