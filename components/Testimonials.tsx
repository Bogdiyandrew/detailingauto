'use client';

import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    name: '-',
    role: '-',
    text: '-',
    rating: 5,
    initials: '-'
  },
  {
    name: '-',
    role: '-',
    text: '-',
    rating: 5,
    initials: '-'
  },
  {
    name: '-',
    role: '-',
    text: '-',
    rating: 5,
    initials: '-'
  },
];

const Testimonials = () => {
  return (
    <section id="recenzii" className="relative bg-brand-dark py-24 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mx-auto max-w-4xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-brand-accent backdrop-blur-sm border border-white/10 mb-6"
          >
            <Star size={14} className="fill-brand-accent" />
            Recenzii verificate
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Nu ne crede pe noi. <br />
            <span className=" bg-clip-text text-blue-300">Crede-i pe ei.</span>
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex flex-col justify-between rounded-3xl bg-white/5 p-8 border border-white/5 shadow-xl hover:bg-white/10 transition-colors duration-300 min-h-[250px]"
            >
              <Quote className="absolute top-6 right-8 text-white/5 h-12 w-12 rotate-180" />

              <div className="relative z-10 flex-grow">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-gray-300 italic">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white shadow-lg border border-white/10">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;