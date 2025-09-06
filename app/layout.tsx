// app/layout.tsx
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // 1. Importăm Footer
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