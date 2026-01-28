'use client';

import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingForm from './BookingForm'; 

const Contact = () => {
  return (
    <section id="contact" className="relative bg-brand-dark py-24 overflow-hidden">
      
      {/* --- BACKGROUND IMAGE (DOAR DESKTOP) --- */}
      <div className="absolute inset-0 hidden lg:block">
        <img 
          src="/contact.jpeg" 
          alt="Atelier Diamond Detailing" 
          className="h-full w-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/80" />
      </div>

      {/* --- BACKGROUND MOBIL --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none opacity-50 lg:hidden" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* MODIFICARE AICI:
              - Am adaugat 'order-2' (pe mobil apare al doilea)
              - Am adaugat 'lg:order-1' (pe desktop ramane primul, in stanga)
          */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 order-2 lg:order-1" 
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Discută cu noi.
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                Preferi o abordare directă? Suntem disponibili telefonic sau pe email pentru orice întrebare.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Card Telefon */}
              <a href="tel:+40700000000" className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/50 transition-all duration-300 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Telefon & WhatsApp</p>
                  <p className="text-lg font-semibold text-white">07xx xxx xxx</p>
                </div>
              </a>

              {/* Card Email */}
              <a href="mailto:contact@diamonddetailing.ro" className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/50 transition-all duration-300 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Email</p>
                  <p className="text-lg font-semibold text-white">contact@diamonddetailing.ro</p>
                </div>
              </a>
              
              {/* Card Locație */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Atelier</p>
                  <p className="text-lg font-semibold text-white">Bl. Nicolae Balcescu nr.92 , Pitești</p>
                </div>
              </div>
            </div>

            {/* --- HARTA --- */}
            <div className="relative mt-2 rounded-2xl overflow-hidden border border-white/10 h-[300px] shadow-2xl">
              <iframe 
                title="Locatie Atelier Diamond Detailing"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.3517141304384!2d24.84987574964095!3d44.87379437307601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bb004afbd27f%3A0x42d9be4ee85d4660!2sDiamond%20Detailing!5e0!3m2!1sro!2sro!4v1769594505511!5m2!1sro!2sro"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:scale-[1.02] transition-transform duration-700"
              ></iframe>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <Clock size={16} className="text-brand-accent" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-300">Program:</span>
                <span>Luni - Vineri: 08:00 - 16:00</span>
              </div>
            </div>

          </motion.div>

          {/* MODIFICARE AICI (Coloana Dreapta - Formularul):
              - Am adaugat 'order-1' (pe mobil apare PRIMUL)
              - Am adaugat 'lg:order-2' (pe desktop revine pe locul doi, in dreapta)
          */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2" 
          >
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Programează online</h3>
                <p className="text-gray-400 text-sm">Alege serviciul și data dorită. E simplu și rapid.</p>
              </div>
              <BookingForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;