'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { Calendar, Clock, User, ShieldCheck, Star, LoaderCircle, PartyPopper, ChevronRight } from 'lucide-react';

// MODIFICARE: Am actualizat numele și ID-urile pentru a fi mai profesionale
const services = [
  { id: 'standard', name: 'Standard', icon: <User size={32} /> },
  { id: 'premium', name: 'Premium Interior', icon: <ShieldCheck size={32} /> },
  { id: 'showroom', name: 'Full Showroom', icon: <Star size={32} /> },
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
    // Simulare trimitere date
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
      <div className="text-center py-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <PartyPopper className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Programare Trimisă!</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">Te vom suna în scurt timp pentru confirmare.</p>
        <button
          onClick={resetForm}
          className="mt-6 rounded-lg bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow hover:bg-gray-800 transition-all w-full"
        >
          Fă o altă programare
        </button>
      </div>
    );
  }

  return (
    <div className="h-full">
      <style jsx global>{`
        .rdp { --rdp-cell-size: 32px; --rdp-accent-color: #0ea5e9; --rdp-background-color: #e0f2fe; margin: 0; width: 100%; }
        .rdp-day_selected:not([disabled]) { background-color: var(--rdp-accent-color); color: white; font-weight: bold; }
        .rdp-day_selected:hover:not([disabled]) { background-color: var(--rdp-accent-color); opacity: 0.8; }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f3f4f6; }
        .rdp-month { width: 100%; }
        .rdp-table { width: 100%; max-width: 100%; }
        .rdp-caption { display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 0.5rem; height: 32px; padding: 0 35px; }
        .rdp-caption_label { font-size: 0.95rem; font-weight: 700; color: #111827; z-index: 1; text-transform: capitalize; }
        .rdp-nav_button { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; background-color: transparent; color: #4b5563; position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; }
        .rdp-nav_button_previous { left: 0; }
        .rdp-nav_button_next { right: 0; }
        .rdp-nav_button:hover { background-color: #f3f4f6; color: #0ea5e9; }
        .rdp-head_cell { color: #6b7280; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding-bottom: 0.5rem; }
        .rdp-day { font-size: 0.875rem; }
      `}</style>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Alege serviciul</h3>
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.name);
                  setSelectedDate(new Date());
                  setStep(2);
                }}
                className="flex items-center gap-5 p-5 rounded-2xl border border-gray-200 bg-white cursor-pointer hover:border-brand-accent transition-all text-left"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors duration-300">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <span className="block text-lg font-bold text-gray-800 mb-1">{service.name}</span>
                  <span className="text-sm text-gray-400 font-medium">Selectează pentru a continua</span>
                </div>
                <ChevronRight className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 pb-2 border-b border-gray-100 flex justify-between items-center">
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SERVICIU</p>
                <p className="text-sm font-bold text-brand-dark truncate max-w-[200px]">{selectedService}</p>
             </div>
             <button onClick={() => setStep(1)} className="text-xs text-brand-accent hover:underline font-medium px-2 py-1 bg-sky-50 rounded">Schimbă</button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full bg-white rounded-lg border border-gray-100 p-1 shadow-sm">
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
              <p className="text-xs font-semibold text-gray-600 mb-2">
                Ora pentru {selectedDate ? format(selectedDate, 'dd MMM', { locale: ro }) : '...'}:
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-1.5 px-1 rounded text-xs font-medium border transition-all ${
                      selectedTime === time 
                        ? 'bg-brand-dark text-white border-brand-dark shadow-sm' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-accent hover:text-brand-accent'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setStep(3)} 
              disabled={!selectedDate || !selectedTime} 
              className="w-full rounded-lg bg-brand-accent px-4 py-3 text-sm font-bold text-white shadow hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continuă
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* MODIFICARE: Contrast crescut pentru rezumat */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-900">
                <User size={18} className="text-brand-accent flex-shrink-0" /> 
                <span className="font-semibold">{selectedService}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-900">
                <Calendar size={18} className="text-brand-accent flex-shrink-0" /> 
                <span className="capitalize font-semibold">{selectedDate ? format(selectedDate, 'PPP', { locale: ro }) : ''}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-900">
                <Clock size={18} className="text-brand-accent flex-shrink-0" /> 
                <span className="font-semibold">Ora {selectedTime}</span>
              </div>
          </div>

          <form className="space-y-3" onSubmit={handleFormSubmit}>
               <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-bold text-gray-700 uppercase">Nume</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Numele tău"
                    className="w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:ring-brand-accent text-gray-900" 
                  />
               </div>
               <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-bold text-gray-700 uppercase">Telefon</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    placeholder="07xx..."
                    className="w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:ring-brand-accent text-gray-900" 
                  />
               </div>
               
               <div className="flex gap-2 mt-6 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    disabled={isSubmitting} 
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Înapoi
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="flex-[2] rounded-lg bg-green-600 px-3 py-2.5 text-sm font-bold text-white shadow hover:bg-green-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                      {isSubmitting ? (
                        <LoaderCircle className="animate-spin h-4 w-4" />
                      ) : (
                        'Rezervă'
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
    <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto min-h-[500px] flex flex-col justify-center">
      <Suspense fallback={<div className="flex justify-center items-center h-40 text-brand-accent"><LoaderCircle className="animate-spin" /></div>}>
        <BookingFormContent />
      </Suspense>
    </div>
  );
};

export default BookingForm;