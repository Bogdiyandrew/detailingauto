'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { Calendar, Clock, User, ShieldCheck, Star, LoaderCircle, PartyPopper, ChevronRight } from 'lucide-react';

const services = [
  { id: 'standard', name: 'Pachet 1', icon: <User size={32} /> },
  { id: 'premium', name: 'Pachet 2', icon: <ShieldCheck size={32} /> },
  { id: 'showroom', name: 'Pachet 3', icon: <Star size={32} /> },
];

const availableTimes = ['09:00', '11:00', '13:00', '15:00', '17:00'];

const BookingFormContent = () => {
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const extractServiceFromUrl = () => {
    if (serviceFromUrl) return serviceFromUrl;
    const hash = window.location.hash;
    if (hash.includes('?service=')) {
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      return urlParams.get('service');
    }
    return null;
  };

  useEffect(() => {
    const serviceFromAnyUrl = extractServiceFromUrl();
    if (serviceFromAnyUrl) {
      const isValidService = services.some(s => s.name === serviceFromAnyUrl);
      if (isValidService) {
        setSelectedService(serviceFromAnyUrl);
        setSelectedDate(new Date());
        setStep(2);
      }
    } else {
      setStep(1);
      setSelectedService(null);
    }
  }, [serviceFromUrl]);

  useEffect(() => {
    const handleServiceSelected = (event: CustomEvent) => {
      const serviceName = event.detail.service;
      const isValidService = services.some(s => s.name === serviceName);
      if (isValidService) {
        setSelectedService(serviceName);
        setSelectedDate(new Date());
        setStep(2);
      }
    };
    window.addEventListener('serviceSelected', handleServiceSelected as EventListener);
    return () => window.removeEventListener('serviceSelected', handleServiceSelected as EventListener);
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulare trimitere date (Demo)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmissionStatus('success');
  };

  const resetForm = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSubmissionStatus('idle');
    window.history.pushState({}, '', window.location.pathname);
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center py-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-accent/20 mb-6">
          <PartyPopper className="h-10 w-10 text-brand-accent" />
        </div>
        <h3 className="text-2xl font-bold text-white">Programare Trimisă!</h3>
        <p className="mt-4 text-gray-400 max-w-xs mx-auto">
          Te vom contacta în cel mai scurt timp pentru confirmare.
        </p>
        <button
          onClick={resetForm}
          className="mt-8 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all w-full border border-white/5"
        >
          Fă o altă programare
        </button>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Stiluri custom pentru DayPicker adaptate la Dark Mode */}
      <style jsx global>{`
        .rdp { 
          --rdp-cell-size: 40px; 
          --rdp-accent-color: var(--color-brand-accent); 
          --rdp-background-color: rgba(255, 255, 255, 0.1); 
          margin: 0; 
          width: 100%; 
        }
        .rdp-day_selected:not([disabled]) { 
          background-color: var(--rdp-accent-color); 
          color: white; 
          font-weight: bold; 
        }
        .rdp-day_selected:hover:not([disabled]) { 
          background-color: var(--rdp-accent-color); 
          opacity: 0.8; 
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { 
          background-color: rgba(255, 255, 255, 0.1); 
        }
        .rdp-month { width: 100%; }
        .rdp-table { width: 100%; max-width: 100%; }
        .rdp-caption { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: relative; 
          margin-bottom: 1rem; 
          padding: 0; 
        }
        .rdp-caption_label { 
          font-size: 1rem; 
          font-weight: 700; 
          color: white; 
          text-transform: capitalize; 
        }
        .rdp-nav_button { 
          width: 32px; 
          height: 32px; 
          border-radius: 8px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background-color: rgba(255,255,255,0.05); 
          color: #9ca3af; 
          position: absolute; 
          top: 50%; 
          transform: translateY(-50%); 
          z-index: 10; 
        }
        .rdp-nav_button_previous { left: 0; }
        .rdp-nav_button_next { right: 0; }
        .rdp-nav_button:hover { 
          background-color: rgba(255,255,255,0.15); 
          color: white; 
        }
        .rdp-head_cell { 
          color: #6b7280; 
          font-weight: 600; 
          font-size: 0.8rem; 
          text-transform: uppercase; 
          padding-bottom: 0.5rem; 
        }
        .rdp-day { 
          font-size: 0.95rem; 
          color: #e5e7eb; 
        }
        .rdp-day_outside {
            opacity: 0.3;
        }
      `}</style>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold text-white mb-6">Alege serviciul</h3>
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.name);
                  setSelectedDate(new Date());
                  setStep(2);
                }}
                className="group flex items-center gap-5 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-accent/50 cursor-pointer transition-all text-left"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand-accent group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <span className="block text-lg font-bold text-white mb-1">{service.name}</span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300">Selectează pentru a continua</span>
                </div>
                <ChevronRight className="text-gray-500 group-hover:text-brand-accent transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 pb-4 border-b border-white/10 flex justify-between items-center">
             <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">SERVICIU ALES</p>
                <p className="text-base font-bold text-white truncate max-w-[200px]">{selectedService}</p>
             </div>
             <button 
                onClick={() => setStep(1)} 
                className="text-xs text-brand-accent hover:text-white font-medium px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
             >
                Schimbă
             </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full bg-white/5 rounded-xl border border-white/5 p-2 shadow-inner">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ro}
                fromDate={new Date()}
                className="w-full flex justify-center"
              />
            </div>
            
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <Clock size={16} className="text-brand-accent" />
                Ora disponibilă pentru {selectedDate ? format(selectedDate, 'dd MMM', { locale: ro }) : '...'}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-1 rounded-lg text-sm font-medium border transition-all ${
                      selectedTime === time 
                        ? 'bg-brand-accent text-white border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.4)]' 
                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-brand-accent/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={() => setStep(3)} 
              disabled={!selectedDate || !selectedTime} 
              className="w-full rounded-xl bg-brand-accent px-4 py-4 text-base font-bold text-white shadow-lg shadow-brand-accent/20 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continuă spre datele de contact
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <User size={18} className="text-brand-accent flex-shrink-0" /> 
                <span className="font-semibold text-white">{selectedService}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Calendar size={18} className="text-brand-accent flex-shrink-0" /> 
                <span className="capitalize font-semibold text-white">{selectedDate ? format(selectedDate, 'PPP', { locale: ro }) : ''}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Clock size={18} className="text-brand-accent flex-shrink-0" /> 
                <span className="font-semibold text-white">Ora {selectedTime}</span>
              </div>
          </div>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
               <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase ml-1">Nume Complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="ex: Andrei Popescu"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none" 
                  />
               </div>
               <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase ml-1">Număr de Telefon</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    placeholder="07xx xxx xxx"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none" 
                  />
               </div>
               
               <div className="flex gap-3 mt-8 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    disabled={isSubmitting} 
                    className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50"
                  >
                    Înapoi
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="flex-[2] rounded-xl bg-brand-accent px-4 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:bg-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                      {isSubmitting ? (
                        <LoaderCircle className="animate-spin h-5 w-5" />
                      ) : (
                        'Confirmă Rezervarea'
                      )}
                  </button>
               </div>
          </form>
        </div>
      )}
    </div>
  );
};

const BookingForm = () => {
  return (
    <div className="bg-brand-dark/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 w-full max-w-md mx-auto min-h-[550px] flex flex-col justify-center relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 blur-[50px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />

      <Suspense fallback={<div className="flex justify-center items-center h-40 text-brand-accent"><LoaderCircle className="animate-spin" /></div>}>
        <BookingFormContent />
      </Suspense>
    </div>
  );
};

export default BookingForm;