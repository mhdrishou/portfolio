'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedNumber({ value, suffix = '' }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        setCount(value);
        return;
      }
      
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, prefersReducedMotion]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const stats = [
    { value: 5, suffix: '+', label: 'Years of Coding' },
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="visible"
          animate={isInView || prefersReducedMotion ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="relative aspect-square max-w-[280px] sm:max-w-md mx-auto w-full mb-8 lg:mb-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-dark rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-[blob_8s_ease-in-out_infinite] opacity-50 blur-2xl" />
            <div className="absolute inset-4 bg-gradient-to-bl from-background to-background/50 backdrop-blur-xl rounded-[40%_60%_60%_40%/40%_40%_60%_60%] border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20">
                MR
              </div>
            </div>
            <motion.div 
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 border border-primary/20 rounded-full border-dashed"
            />
          </motion.div>

          <div className="flex flex-col">
            <motion.div variants={itemVariants} className="mb-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">About Me</h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">
              Creative and results-oriented Freelance Web Developer & Designer with 2+ years of experience building modern web applications, portfolio websites, and AI-powered solutions. Founder of an independent freelance agency specializing in vibe coding, UI/UX design, and AI chatbot integration.
            </motion.p>

            <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group"
                >
                  <div className="text-4xl font-display font-bold text-primary mb-2 transition-transform group-hover:scale-110">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-foreground/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
      `}</style>
    </section>
  );
}
