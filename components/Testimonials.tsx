// app/components/Testimonials.tsx
import { Star } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Vlad C.',
    text: 'Un detailing de nota 100. Profesionalism, produse de foarte mare calitate, punctualitate. Nu mă așteptam să iasă atât de bine!',
    rating: 5,
  },
  {
    name: 'Georgiana M.',
    text: 'După detailingul complet efectuat am retrăit același sentiment ca atunci când mașina era nouă! Recomand cu încredere!',
    rating: 5,
  },
  {
    name: 'Iulian G.',
    text: 'Am fost foarte mulțumit de serviciile oferite. Înainte să ajung la ei mașina arăta jalnic, dupa serviciul complet de detailing masina arata ca noua.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    // === CORECȚIA ESTE AICI ===
    // Am adăugat spațiu între className și id
    <section id="recenzii" className="bg-brand-dark py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">Ce Spun Clienții Noștri</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Peste 200 de Povești de Succes
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="flex flex-col rounded-2xl bg-white/5 p-8 shadow-lg ring-1 ring-white/10">
              <figure className="flex flex-col flex-grow">
                <blockquote className="flex-grow text-lg leading-8 text-white">
                  <p>“{testimonial.text}”</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-x-4">
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="flex items-center gap-x-1 text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;