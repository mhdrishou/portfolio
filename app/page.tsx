import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

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
