'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css'; 
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { 
  Clock, 
  User, 
  LoaderCircle, 
  PartyPopper, 
  ChevronRight, 
  ChevronLeft, 
  CarFront, 
  Gem, 
  Sparkle, 
  ArrowLeft, 
  Check,
  AlertCircle // Iconita pentru eroare
} from 'lucide-react';

// --- DATE SERVICII ---
const services = [
  { 
    id: 'refresh', 
    name: 'Refresh', 
    description: 'Perfect pentru întreținere lunarǎ',
    icon: <CarFront className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: 'from-blue-400 to-blue-600'
  },
  { 
    id: 'deepclean', 
    name: 'Deep', 
    description: 'Scoate mizeria din tapițerie și dă luciu',
    icon: <Sparkle className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: 'from-purple-400 to-purple-600'
  },
  { 
    id: 'reset', 
    name: 'Reset total', 
    description: 'O aducem cât mai aproape de starea de fabrică',
    icon: <Gem className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: 'from-emerald-400 to-emerald-600'
  },
];

const availableTimes = ['09:00', '11:00', '13:00', '15:00', '17:00'];

const BookingFormContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // State-uri pentru formular si validare
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // --- LOGICĂ URL ---
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    
    if (serviceParam) {
      const isValidService = services.some(s => s.name === serviceParam);
      
      if (isValidService) {
        setSelectedService(prev => prev !== serviceParam ? serviceParam : prev);
        
        setStep(currentStep => {
            if (currentStep === 1) {
                setSelectedDate(new Date());
                return 2;
            }
            return currentStep;
        });
      }
    }
  }, [searchParams]);

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedDate(new Date());
    setStep(2);
    const params = new URLSearchParams(searchParams);
    params.set('service', serviceName);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleModifyService = () => {
    setStep(1);
    setSelectedService(null);
    const params = new URLSearchParams(searchParams);
    params.delete('service');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetForm = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSubmissionStatus('idle');
    setName('');
    setPhoneNumber('');
    setErrors({});
    router.replace(pathname, { scroll: false });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, '');
    const limitedNumbers = numbersOnly.slice(0, 10);
    setPhoneNumber(limitedNumbers);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim() || name.length < 3) {
        newErrors.name = 'Te rugăm să introduci numele complet.';
    }

    if (phoneNumber.length < 10) {
        newErrors.phone = 'Numărul de telefon este invalid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return; // Oprește execuția dacă sunt erori
    }

    setIsSubmitting(true);
    // Simulare request API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmissionStatus('success');
  };

  if (submissionStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-500">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-sky-500/30 blur-xl rounded-full animate-pulse"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 to-sky-600 shadow-lg shadow-sky-500/20">
            <PartyPopper className="h-12 w-12 text-white" />
            </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Programare Trimisă!</h3>
        <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed mb-8">
          Te vom contacta telefonic în cel mai scurt timp pentru confirmarea finală a pachetului {selectedService}.
        </p>
        <button
          onClick={resetForm}
          className="cursor-pointer rounded-xl bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all border border-white/5 active:scale-95"
        >
          Fă o altă programare
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col w-full relative">
      <style jsx global>{`
        .rdp-root {
            --rdp-accent-color: #38bdf8;
            --rdp-accent-background-color: #0ea5e9;
            --rdp-day_button-border-radius: 8px;
            --rdp-day_button-width: 40px;
            --rdp-day_button-height: 40px;
            --rdp-selected-border: 2px solid #38bdf8;
            margin: 0 !important;
        }
        .rdp-weekday { color: #38bdf8 !important; }
        .rdp-nav_button svg { color: #38bdf8 !important; fill: #38bdf8 !important; stroke: #38bdf8 !important; }
        .rdp-chevron { fill: #38bdf8 !important; color: #38bdf8 !important; }
        .rdp-day { font-size: 0.95rem; color: #e5e7eb; cursor: pointer; }
        .rdp-caption_label { text-transform: capitalize; font-size: 1.1rem; color: white; }
        .rdp-head_cell { font-size: 0.8rem; text-transform: uppercase; }
        .rdp-day_disabled { opacity: 0.25 !important; cursor: not-allowed !important; text-decoration: line-through; }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
            background-color: rgba(255,255,255,0.1) !important;
            border-radius: 8px;
        }
        .rdp-day_selected {
            font-weight: bold;
            color: white !important;
            box-shadow: 0 0 15px rgba(56,189,248,0.3);
        }
        .rdp-nav_button { background-color: rgba(255,255,255,0.05); cursor: pointer; }
        .rdp-nav_button:hover { background-color: rgba(255,255,255,0.15); }
      `}</style>

      {/* --- PROGRESS BAR --- */}
      <div className="flex gap-2 mb-6">
         {[1, 2, 3].map(i => (
             <div key={i} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= i ? 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`} />
         ))}
      </div>

      {/* --- STEP 1: SERVICES --- */}
      {step === 1 && (
        <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-300">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Alege Pachetul</h3>
          <p className="text-gray-400 text-sm mb-6">Selectează serviciul dorit pentru a verifica disponibilitatea.</p>
          
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.name)}
                className="cursor-pointer group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/5 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                
                <div className={`flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <span className="block text-base sm:text-lg font-bold text-white leading-tight mb-0.5">{service.name}</span>
                  <span className="text-xs sm:text-sm text-gray-400 truncate block">{service.description}</span>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* --- STEP 2: CALENDAR & TIME --- */}
      {step === 2 && (
        <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-300">
          
          <div className="mb-4 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
             {/* BUTON MODIFICĂ */}
             <button 
                onClick={handleModifyService} 
                className="cursor-pointer flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-all group"
             >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Modifică</span>
             </button>

             {/* DETALII PACHET */}
             <div className="flex items-center gap-3 flex-row-reverse text-right">
                <div className="p-2 bg-sky-400/20 rounded-lg text-sky-400">
                    <Sparkle size={16} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Serviciu Ales</p>
                    <p className="text-sm font-bold text-white leading-none">{selectedService}</p>
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/5 p-4 mb-6 flex justify-center w-full">
              
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ro}
                disabled={{ before: new Date() }}
                fromDate={new Date()}
                showOutsideDays
                classNames={{
                    nav: "flex gap-2 absolute right-0 top-0",
                    nav_button: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors border border-white/10 cursor-pointer",
                    caption: "relative flex items-center justify-start h-10 mb-4 pl-2",
                    table: "w-full border-collapse",
                    head_row: "flex w-full",
                    head_cell: "w-10 font-bold text-[0.8rem] uppercase mb-2",
                    row: "flex w-full mt-1",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                    day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-lg transition-colors text-gray-300 cursor-pointer",
                    day_selected: "bg-sky-500 text-white hover:bg-sky-600 hover:text-white focus:bg-sky-500 focus:text-white",
                    day_today: "bg-white/5 text-white border border-white/20",
                    day_outside: "text-gray-600 opacity-50",
                    day_disabled: "text-gray-700 opacity-20 cursor-not-allowed",
                    day_hidden: "invisible",
                }}
                components={{
                    Chevron: (props) => {
                        if (props.orientation === 'left') {
                            return <ChevronLeft className="h-4 w-4 text-sky-400" style={{ color: '#38bdf8' }} />;
                        }
                        return <ChevronRight className="h-4 w-4 text-sky-400" style={{ color: '#38bdf8' }} />;
                    }
                }}
              />

            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Clock size={16} className="text-sky-400" />
                Disponibilitate {selectedDate ? format(selectedDate, 'dd MMMM', { locale: ro }) : ''}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`cursor-pointer py-2.5 rounded-lg text-sm font-bold border transition-all duration-200 ${
                      selectedTime === time 
                        ? 'bg-sky-400 text-white border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105' 
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <button 
              onClick={() => setStep(3)} 
              disabled={!selectedDate || !selectedTime} 
              className="cursor-pointer group w-full relative overflow-hidden rounded-xl bg-sky-400 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-sky-400/20 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continuă <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* --- STEP 3: CONTACT FORM --- */}
      {step === 3 && (
        <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-300">
          <button 
            onClick={() => setStep(2)}
            className="cursor-pointer self-start mb-4 text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Înapoi
          </button>

          <h3 className="text-2xl font-bold text-white mb-6">Date Contact</h3>

          <div className="bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/10 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                 <Gem size={80} className="text-white" />
              </div>
              <div className="relative space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-sky-400/20 text-sky-400 px-2 py-1 rounded uppercase tracking-wider">Serviciu</span>
                    <span className="text-sm font-semibold text-white">{selectedService}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-purple-500/20 text-purple-400 px-2 py-1 rounded uppercase tracking-wider">Data</span>
                    <span className="text-sm font-semibold text-white capitalize">
                        {selectedDate ? format(selectedDate, 'eee, dd MMMM', { locale: ro }) : ''}, {selectedTime}
                    </span>
                  </div>
              </div>
          </div>

          {/* Adaugat noValidate pentru a dezactiva mesajele browserului */}
          <form className="flex-1 flex flex-col gap-4" onSubmit={handleFormSubmit} noValidate>
               <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase ml-1">Nume Complet</label>
                  <div className="relative group">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-gray-500 group-focus-within:text-sky-400'}`} size={18} />
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Nume Prenume"
                        className={`w-full rounded-xl border bg-black/20 pl-10 pr-4 py-3.5 text-white placeholder-gray-600 transition-all outline-none 
                            ${errors.name 
                                ? 'border-red-500/50 focus:border-red-500 focus:bg-red-500/5' 
                                : 'border-white/10 focus:border-sky-400 focus:bg-white/5 focus:ring-1 focus:ring-sky-400'
                            }`}
                    />
                  </div>
                  {errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1 ml-1 animate-in slide-in-from-top-1 fade-in">
                          <AlertCircle size={12} /> {errors.name}
                      </p>
                  )}
               </div>

               <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase ml-1">Număr de Telefon</label>
                  <div className="relative group">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors font-bold text-sm ${errors.phone ? 'text-red-400' : 'text-gray-500 group-focus-within:text-sky-400'}`}>+40</div>
                    <input 
                        type="tel" 
                        id="phone" 
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="7xx xxx xxx"
                        inputMode="numeric"
                        maxLength={10}
                        className={`w-full rounded-xl border bg-black/20 pl-12 pr-4 py-3.5 text-white placeholder-gray-600 transition-all outline-none
                             ${errors.phone 
                                ? 'border-red-500/50 focus:border-red-500 focus:bg-red-500/5' 
                                : 'border-white/10 focus:border-sky-400 focus:bg-white/5 focus:ring-1 focus:ring-sky-400'
                            }`}
                    />
                  </div>
                   {errors.phone && (
                      <p className="text-xs text-red-400 flex items-center gap-1 ml-1 animate-in slide-in-from-top-1 fade-in">
                          <AlertCircle size={12} /> {errors.phone}
                      </p>
                  )}
               </div>
               
               <div className="mt-auto pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="cursor-pointer w-full rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                      {isSubmitting ? (
                        <>
                            <LoaderCircle className="animate-spin h-5 w-5" />
                            <span>Se procesează...</span>
                        </>
                      ) : (
                        <>
                            <span>Confirmă Programarea</span>
                            <Check className="h-5 w-5" />
                        </>
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
    <div className="w-full h-full flex flex-col">
        <Suspense fallback={<div className="flex justify-center items-center h-40 text-sky-400"><LoaderCircle className="animate-spin" /></div>}>
          <BookingFormContent />
        </Suspense>
    </div>
  );
};

export default BookingForm;