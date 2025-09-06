import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${poppins.variable} bg-brand-dark font-sans`}>
        {/* === AICI ADĂUGĂM SKIP LINK-UL === */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-brand-dark focus:font-semibold focus:rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          Sari la conținutul principal
        </a>

        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
      </body>
    </html>
  );
}