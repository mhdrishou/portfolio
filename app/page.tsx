'use client';

import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-20 w-full overflow-hidden">
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
