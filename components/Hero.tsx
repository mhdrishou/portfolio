'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';

const SplineEmbed = dynamic(() => Promise.resolve(function SplineComponent() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 1.5, 
        delay: 0.5, 
        type: "spring", 
        stiffness: 50, 
        damping: 15 
      }}
      className="relative w-full h-full overflow-hidden rounded-3xl pointer-events-auto group"
    >
      {/* Background Mask to blend edges */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background via-transparent to-background opacity-20" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background via-transparent to-background opacity-20" />
      
      <iframe 
        src="https://my.spline.design/rememberallrobot-b5RzsW7Oc9qBwKGMV5NJ2qog/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        className="w-[110%] h-[110%] -ml-[5%] -mt-[5%] min-h-[350px] sm:min-h-[440px] md:min-h-full filter grayscale-[0.2] contrast-[1.1]"
        title="3D Robot Model"
        loading="eager"
      ></iframe>
      
      {/* Absolute Bottom Cover to hide "Built with Spline" */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </motion.div>
  );
}), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/5 animate-pulse rounded-3xl" />
});

const nameChars = "Muhammed Rishan".split("");
const subtitle = "Web Developer · Designer · AI Specialist";

function MagneticButton({ children, href, primary = false }: { children: React.ReactNode, href: string, primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={prefersReducedMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-colors duration-300 ${
        primary 
          ? 'bg-primary text-black hover:bg-primary-light shadow-[0_0_20px_rgba(91,196,245,0.4)]' 
          : 'glass hover:bg-white/20 dark:hover:bg-white/10'
      }`}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let i = 0;
    
    const startDelay = setTimeout(() => {
      const type = () => {
        if (i < subtitle.length) {
          setTypedText(subtitle.substring(0, i + 1));
          i++;
          timeout = setTimeout(type, 50);
        }
      };
      type();
    }, prefersReducedMotion ? 0 : 1500);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        <div className="flex flex-col items-start pt-12 lg:pt-0">
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm text-primary font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for Freelance Work
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 flex flex-wrap">
            {"Muhammed Rishan".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="whitespace-nowrap mr-[0.3em] last:mr-0">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + (wordIndex * 10 + charIndex) * 0.03,
                      type: "spring",
                      damping: 20,
                      stiffness: 100
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="h-20 sm:h-16 md:h-8 mb-8 text-lg sm:text-xl md:text-2xl text-foreground/70 font-mono flex items-center flex-wrap">
            {typedText}
            <motion.span
              animate={prefersReducedMotion ? {} : { opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-3 h-6 bg-primary ml-1"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {['React', 'AI Integration', 'Next.js', 'Figma', 'OpenAI API'].map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 1, scale: 1 }}
                animate={prefersReducedMotion ? {} : { 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -5, 0]
                }}
                transition={{ 
                  opacity: { delay: 1.5 + i * 0.1, duration: 0.4 },
                  scale: { delay: 1.5 + i * 0.1, duration: 0.4 },
                  y: { repeat: Infinity, duration: 3, delay: i * 0.2, ease: "easeInOut" }
                }}
                className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm whitespace-nowrap"
              >
                {badge}
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <MagneticButton href="#projects" primary>
                View My Work <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href="#contact">
                Let's Talk <MessageSquare className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-[350px] sm:h-[500px] lg:h-[800px] w-full relative -mx-4 md:mx-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <SplineEmbed />
        </motion.div>
      </div>

      <motion.div 
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-foreground/50 hidden md:flex"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
