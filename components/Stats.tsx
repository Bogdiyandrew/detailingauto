import { Car, ShieldCheck, Star } from 'lucide-react';

// Datele pentru statistici, pentru a menține codul curat
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
    // Folosim culoarea de fundal 'brand-light'
    <section className="bg-brand-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center lg:max-w-none lg:grid-cols-3">
          
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
      </div>
    </section>
  );
};

export default Stats;