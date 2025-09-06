import { Phone, Mail, MapPin } from 'lucide-react';
import BookingForm from './BookingForm'; 
const Contact = () => {
  return (
    <section id="contact" className="bg-brand-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">Programează-te Online</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Gata să-ți Transformi Mașina?
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-brand-gray">
            Alege serviciul, data și ora direct din calendar sau sună-ne pentru o programare.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          
          <div className="w-full">
            <BookingForm />
          </div>

          <div className="w-full space-y-8 lg:pt-8">
             <div className="space-y-6">
              <div className="flex gap-x-4">
                <div className="flex-shrink-0"><Phone className="h-6 w-6 text-brand-accent" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark">Telefon</h3>
                  <p className="text-brand-gray">Preferi să vorbești cu cineva? Sună-ne!</p>
                  <a href="tel:+40751201507" className="mt-1 block text-brand-dark hover:text-brand-accent">+40...</a>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-shrink-0"><Mail className="h-6 w-6 text-brand-accent" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark">Email</h3>
                  <p className="text-brand-gray">Pentru oferte personalizate și întrebări</p>
                  <a href="mailto:contact@diamonddetailing.ro" className="mt-1 block text-brand-dark hover:text-brand-accent">contact@exemplu.ro</a>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-shrink-0"><MapPin className="h-6 w-6 text-brand-accent" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark">Adresă Atelier</h3>
                  <p className="text-brand-gray">Te așteptăm la locația noastră</p>
                  <p className="mt-1 block text-brand-dark">Pitești, Argeș (adresa exacta aici)</p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-64 rounded-xl bg-brand-gray/20 flex items-center justify-center">
              <p className="text-brand-gray">Harta Google Maps va fi integrată aici</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;