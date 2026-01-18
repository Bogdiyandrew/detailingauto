'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingForm from './BookingForm'; 

const Contact = () => {
  return (
    <section id="contact" className="relative bg-brand-dark py-24 overflow-hidden">
      
      {/* Background subtil - O singură lumină difuză, foarte fină */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Coloana Stânga - Informații directe */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Discută cu noi.
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                Preferi o abordare directă? Suntem disponibili telefonic sau pe email pentru orice întrebare legată de pachetele noastre.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Card Telefon - Simplu și curat */}
              <a href="tel:+07xxxxxxxx" className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/50 transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Telefon & WhatsApp</p>
                  <p className="text-lg font-semibold text-white">07xx xxx xxx</p>
                </div>
              </a>

              {/* Card Email */}
              <a href="mailto:contact@diamonddetailing.ro" className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/50 transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Email</p>
                  <p className="text-lg font-semibold text-white">contact@.ro</p>
                </div>
              </a>
              
              {/* Card Locație */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Atelier</p>
                  <p className="text-lg font-semibold text-white">Pitești, Argeș</p>
                </div>
              </div>
            </div>

            {/* Program */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <Clock size={16} className="text-brand-accent" />
              <span>Rǎspundem rapid</span>
            </div>

          </motion.div>

          {/* Coloana Dreapta - Formularul */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Container Formular - Curat, fără efecte exagerate */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Programează online</h3>
                <p className="text-gray-400 text-sm">Alege serviciul și data dorită. E simplu și rapid.</p>
              </div>
              
              {/* Aici vine formularul tău. Containerul acesta îi oferă un fundal curat. */}
              <BookingForm />
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;