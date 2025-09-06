import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative flex h-screen items-center justify-center text-center text-white">
      {/* Imaginea de fundal pentru Desktop */}
      <Image
        src="/hero-desktop.webp"
        alt="Interior auto curățat profesional - vedere largă"
        fill
        className="hidden object-cover md:block"
        priority
        quality={90}
      />

      {/* Imaginea de fundal pentru Mobil */}
      <Image
        src="/hero-mobile.webp"
        alt="Volan și consolă centrală curățate în detaliu"
        fill
        className="block object-cover md:hidden"
        priority
        quality={80}
      />

      {/* Overlay întunecat pentru lizibilitate */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Container pentru conținut */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20">
        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Redă Strălucirea de <span className="text-brand-accent">Diamant</span> Mașinii Tale
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base font-light text-brand-gray md:text-lg">
          Servicii de detailing auto premium în Pitești. Peste 200 de clienți mulțumiți ne recomandă.
        </p>
        <Link
          href="/#contact"
          className="inline-block rounded-md border border-brand-accent bg-brand-accent/10 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-brand-accent/20 focus:outline-none focus:ring-2 focus:ring-brand-accent"
        >
          Obține o Ofertă Acum
        </Link>
      </div>

      {/* Separator unghiular la baza secțiunii */}
      <div className="absolute inset-x-0 bottom-0 h-24">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Culoarea de umplere este 'brand-light' pentru a se potrivi cu secțiunea următoare */}
          <path d="M0,100 L50,0 L100,100 Z" className="fill-current text-brand-light" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;