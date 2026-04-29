'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import LoadingScreen from '@/components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a slightly longer load for the cinematic effect or wait for fonts/assets
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      <div className="flex flex-col gap-24 md:gap-32 pb-20 w-full overflow-hidden">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
