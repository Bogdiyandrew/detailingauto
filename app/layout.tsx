import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-poppins',
});

// --- AICI ESTE MODIFICAREA ---
export const metadata: Metadata = {
  title: {
    template: '%s | Detailing Auto Pitești', 
    default: 'Detailing Auto Pitești',
  },
  description: 'Servicii profesionale de detailing auto interior și exterior în Pitești. Polish, curățare tapițerie, protecție ceramică.',
  keywords: ['detailing auto', 'pitesti', 'polish', 'curatare auto', 'cosmetica auto'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};
// -----------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${poppins.variable} bg-brand-dark font-sans`}>
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