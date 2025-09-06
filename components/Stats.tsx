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
    // 1. Am adăugat un id și am schimbat fundalul într-un gri subtil
    <section id="stats" className="bg-slate-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 2. Am adăugat un container nou pentru cardul alb */}
        <div className="relative isolate overflow-hidden bg-white px-6 py-16 text-center shadow-2xl rounded-3xl sm:px-16">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {statsData.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
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
          {/* Efect vizual subtil (opțional) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#00bfff] to-[#90e0ef] opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;