// app/components/BookingForm.tsx
'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { Check, Calendar, Clock, User, Car, ShieldCheck, Star } from 'lucide-react';

const services = [
  { id: 'interior', name: 'Detailing Interior', icon: <User size={24} /> },
  { id: 'ceramic', name: 'Polish & Ceramic', icon: <ShieldCheck size={24} /> },
  { id: 'crystal', name: 'Pachetul Crystal', icon: <Star size={24} /> },
];

const availableTimes = ['09:00', '11:00', '13:00', '15:00', '17:00'];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const renderStep = () => {
    switch (step) {
      case 1: // Service Selection
        return (
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-4">Pasul 1: Alege serviciul dorit</h3>
            <div className="grid grid-cols-1 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.name);
                    setStep(2);
                  }}
                  // Am adăugat cursor-pointer aici
                  className="flex items-center gap-4 p-4 border rounded-lg text-left hover:bg-brand-accent/10 hover:border-brand-accent transition-all cursor-pointer"
                >
                  <span className="text-brand-accent">{service.icon}</span>
                  <span className="font-semibold text-brand-dark">{service.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // Date & Time Selection
        return (
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-4">Pasul 2: Alege data și ora</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ro}
                  fromDate={new Date()}
                  styles={{
                    head_cell: { width: '40px' },
                    caption_label: { fontSize: '1.1rem', fontWeight: 'bold' },
                  }}
                />
              </div>
              {selectedDate && (
                <div className="flex flex-col">
                  <h4 className="font-semibold mb-2">Ore disponibile pentru {format(selectedDate, 'PPP', { locale: ro })}:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        // Am adăugat cursor-pointer aici
                        className={`p-2 border rounded-md text-center transition-colors cursor-pointer ${
                          selectedTime === time ? 'bg-brand-accent text-white border-brand-accent' : 'hover:border-brand-accent'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="text-sm font-semibold text-brand-gray hover:text-brand-dark cursor-pointer">Înapoi</button>
              <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime} className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed">
                Continuă
              </button>
            </div>
          </div>
        );

      case 3: // Confirmation & Details
        return (
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-4">Pasul 3: Confirmă programarea</h3>
            <div className="bg-white/80 p-6 rounded-lg border border-brand-gray/20 space-y-4 mb-6">
                <div className="flex items-center gap-3"><Check className="text-brand-accent" /> <span className="text-brand-dark">Serviciu: <strong>{selectedService}</strong></span></div>
                <div className="flex items-center gap-3"><Calendar className="text-brand-accent" /> <span className="text-brand-dark">Data: <strong>{selectedDate ? format(selectedDate, 'PPP', { locale: ro }) : ''}</strong></span></div>
                <div className="flex items-center gap-3"><Clock className="text-brand-accent" /> <span className="text-brand-dark">Ora: <strong>{selectedTime}</strong></span></div>
            </div>
            <form className="space-y-4">
                 <div>
                    <label htmlFor="name" className="text-sm font-medium">Nume complet</label>
                    <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm" />
                 </div>
                 <div>
                    <label htmlFor="phone" className="text-sm font-medium">Număr de telefon</label>
                    <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm" />
                 </div>
                 <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(2)} className="text-sm font-semibold text-brand-gray hover:text-brand-dark cursor-pointer">Înapoi</button>
                    <button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 cursor-pointer">
                        Confirmă Programarea
                    </button>
                 </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-gray/10">{renderStep()}</div>;
};

export default BookingForm;