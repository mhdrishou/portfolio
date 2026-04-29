'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Tilt } from 'react-tilt';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    slug: "ai-saas-platform",
    title: "AI-Powered SaaS Platform",
    description: "A full-stack SaaS application with integrated OpenAI capabilities for automated content generation and analysis. Features a custom dashboard and stripe integration.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind", "Prisma"],
    gradient: "from-blue-600 to-indigo-600",
    link: "https://github.com"
  },
  {
    slug: "ecommerce-engine",
    title: "Modern E-Commerce Engine",
    description: "High-performance headless commerce site using MedusaJS and Next.js. Optimized for Core Web Vitals with complex filtering and real-time inventory.",
    tags: ["MedusaJS", "Next.js", "PostgreSQL", "Tailwind"],
    gradient: "from-purple-600 to-pink-600",
    link: "https://github.com"
  },
  {
    slug: "3d-dashboard",
    title: "Interactive 3D Dashboard",
    description: "A data visualization platform incorporating Three.js for immersive data storytelling. Used for monitoring real-time server metrics and user activity.",
    tags: ["Three.js", "React-Three-Fiber", "D3.js", "Firebase"],
    gradient: "from-cyan-600 to-teal-600",
    link: "https://github.com"
  },
  {
    slug: "agency-hub",
    title: "Freelance Agency Hub",
    description: "The primary portal for my freelance operations, featuring automated client onboarding, project tracking, and a dynamic portfolio showcase.",
    tags: ["Next.js", "Framer Motion", "Resend", "Sanity.io"],
    gradient: "from-orange-600 to-red-600",
    link: "https://github.com"
  },
  {
    slug: "realtime-chat",
    title: "Real-time Chat Application",
    description: "Scalable messaging platform with support for group chats, file sharing, and end-to-end encryption using Socket.io and Redis.",
    tags: ["Socket.io", "Express", "MongoDB", "Redis"],
    gradient: "from-emerald-600 to-green-600",
    link: "https://github.com"
  },
  {
    slug: "photography-portfolio",
    title: "Portfolio for Photographers",
    description: "A minimalist, high-speed image gallery focused on visual impact and smooth transitions. Built with advanced Framer Motion techniques.",
    tags: ["React", "Framer Motion", "Intersection Observer"],
    gradient: "from-amber-600 to-yellow-600",
    link: "https://github.com"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
                <div className="glass-card h-full rounded-2xl border border-white/5 overflow-hidden group">
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 relative flex items-center justify-center`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 gap-4">
                      <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-display font-bold mb-3">{project.title}</h3>
                    <p className="text-foreground/70 mb-6 line-clamp-3">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-mono text-primary px-2 py-1 bg-primary/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="w-full py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-black transition-all font-bold flex items-center justify-center gap-2"
                    >
                      View Project <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
  );
}
