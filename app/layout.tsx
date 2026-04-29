import type { Metadata } from 'next';
import { Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import ParticleBackground from '@/components/ParticleBackground';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Muhammed Rishan | Web Developer & Designer & AI Specialist',
  description: 'Portfolio of Muhammed Rishan, a Freelance Web Developer, Designer, and AI Integration Specialist based in Doha, Qatar.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${dmSans.variable} ${spaceMono.variable} font-sans antialiased relative min-h-screen selection:bg-primary selection:text-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorGlow />
          <ParticleBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
