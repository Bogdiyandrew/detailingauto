import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import BeforeAfter from '@/components/BeforeAfter';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Stats />
      <BeforeAfter />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}