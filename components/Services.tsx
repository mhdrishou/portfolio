'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Tilt } from 'react-tilt';
import { Monitor, Bot, PenTool, Zap, Cpu, Briefcase } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Custom Portfolio & Business Websites",
    description: "Designing and building blazing fast, responsive websites tailored to your brand identity."
  },
  {
    icon: Bot,
    title: "AI Chatbot Development & Integration",
    description: "Integrating intelligent, conversational AI assistants to elevate customer experience."
  },
  {
    icon: PenTool,
    title: "UI/UX Design & Brand Identity",
    description: "Crafting intuitive, beautiful user interfaces and cohesive visual brand systems."
  },
  {
    icon: Zap,
    title: "Website Redesign & Performance",
    description: "Modernizing legacy sites with Next.js for maximum performance and SEO."
  },
  {
    icon: Cpu,
    title: "AI-Powered Web App Development",
    description: "Building scalable web applications supercharged with cutting-edge AI capabilities."
  },
  {
    icon: Briefcase,
    title: "Freelance Project Management",
    description: "End-to-end consulting and management to bring your digital vision to life."
  }
];

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">My Services</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="visible"
          animate={isInView || prefersReducedMotion ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Tilt options={prefersReducedMotion ? { max: 0, scale: 1 } : defaultTiltOptions} className="h-full">
                  <div className="glass-card h-full p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-500 group relative overflow-hidden flex flex-col">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
                    
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-foreground/70 leading-relaxed mt-auto">
                      {service.description}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
