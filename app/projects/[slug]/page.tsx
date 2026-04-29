'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Zap, Shield, Globe } from 'lucide-react';

const projectDetails = {
  'ai-saas-platform': {
    title: "AI-Powered SaaS Platform",
    description: "A comprehensive SaaS solution that leverages cutting-edge AI to automate content creation and business analytics. This project focus was on creating a seamless user experience while handling complex backend operations.",
    features: [
      "Advanced NLP integration for automated reporting",
      "Real-time data visualization with D3.js",
      "Secure payment processing with Stripe",
      "Customizable user dashboards and role-based access"
    ],
    tech: ["Next.js", "OpenAI", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    gradient: "from-blue-600 to-indigo-600",
    fullStory: "The AI-Powered SaaS Platform was born out of a need to simplify data analysis for non-technical users. By integrating GPT-4, we enabled users to ask questions about their business data in plain English and receive instant, visualized answers. The architecture was built for scale, using serverless functions to handle heavy AI processing loads without compromising front-end performance."
  },
  'ecommerce-engine': {
    title: "Modern E-Commerce Engine",
    description: "A high-performance, headless e-commerce solution designed for luxury brands. Focused on sub-second load times and a highly immersive shopping experience.",
    features: [
      "Headless architecture with MedusaJS",
      "Sub-second page transitions and search",
      "Multi-currency and multi-language support",
      "Advanced inventory management system"
    ],
    tech: ["MedusaJS", "Next.js", "Redis", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-purple-600 to-pink-600",
    fullStory: "For this luxury brand client, speed was the ultimate luxury. We built a custom storefront that pre-fetches products and uses image optimization to ensure every interaction feels instantaneous. The backend is fully decoupled, allowing the client to manage their global inventory across multiple regions with ease."
  },
  '3d-dashboard': {
    title: "Interactive 3D Dashboard",
    description: "An immersive data visualization platform that turns flat metrics into interactive 3D landscapes. Designed for high-stakes monitoring environments.",
    features: [
      "Real-time 3D rendering with Three.js",
      "Dynamic lighting and camera controls",
      "WebSocket integration for live data",
      "High-performance GPU-accelerated graphics"
    ],
    tech: ["Three.js", "React-Three-Fiber", "D3.js", "Firebase", "WebSockets"],
    gradient: "from-cyan-600 to-teal-600",
    fullStory: "The challenge was to make complex server farm metrics intuitive. We moved away from traditional 2D charts and created a 'Digital Twin' of the server room. Users can fly through the virtual racks, with heat signatures and bandwidth peaks visualized as glowing 3D pulses. It transformed a boring monitoring task into an engaging, visual experience."
  },
  'agency-hub': {
    title: "Freelance Agency Hub",
    description: "A centralized platform for managing freelance operations, from client onboarding to project delivery and automated invoicing.",
    features: [
      "Automated client onboarding workflow",
      "Dynamic portfolio management system",
      "Integrated project tracking and timeline",
      "Secure client portal for file sharing"
    ],
    tech: ["Next.js", "Sanity.io", "Framer Motion", "Resend", "Tailwind"],
    gradient: "from-orange-600 to-red-600",
    fullStory: "As my freelance business grew, I needed a way to automate the repetitive tasks. The Agency Hub is my personal operating system. It handles everything from generating project proposals to tracking feedback on design iterations. By automating the administrative overhead, I can focus 100% of my energy on the creative and technical work for my clients."
  },
  'realtime-chat': {
    title: "Real-time Chat Application",
    description: "A secure, scalable messaging platform built for high-concurrency environments. Focused on privacy and instant delivery.",
    features: [
      "End-to-end encryption for all messages",
      "Support for large-scale group chats",
      "Real-time file sharing and link previews",
      "Offline message queuing and syncing"
    ],
    tech: ["Socket.io", "Node.js", "Express", "MongoDB", "Redis"],
    gradient: "from-emerald-600 to-green-600",
    fullStory: "Built to handle thousands of concurrent connections, this chat app uses Redis for horizontal scaling. Security was the top priority, so we implemented a custom E2EE protocol using the Signal library. The result is a platform that is as fast as it is secure, providing a friction-less communication experience for enterprise teams."
  },
  'photography-portfolio': {
    title: "Portfolio for Photographers",
    description: "A minimalist, visually-driven portfolio designed to make high-resolution photography the star of the show. Built for speed and impact.",
    features: [
      "Custom masonry layout for images",
      "Progressive image loading and blurring",
      "Smooth layout transitions between galleries",
      "SEO-optimized image metadata management"
    ],
    tech: ["React", "Framer Motion", "Cloudinary", "Intersection Observer"],
    gradient: "from-amber-600 to-yellow-600",
    fullStory: "Photographers need their work to look perfect on any screen. We built a custom image pipeline that serves the exact size and format needed for the device, ensuring the site loads in under 1.5 seconds even with hundreds of high-res images. The navigation is designed to be invisible, using subtle gestures and transitions to let the photography speak for itself."
  }
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projectDetails[slug as keyof typeof projectDetails];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-primary hover:underline">Return to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`aspect-video rounded-3xl bg-gradient-to-br ${project.gradient} p-1 mb-8`}>
              <div className="w-full h-full bg-background/90 rounded-[22px] flex items-center justify-center overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                <h1 className="text-4xl md:text-6xl font-display font-bold text-center px-6 z-10">
                  {project.title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.tech.map((t, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>{project.description}</p>
              <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
              <p>{project.fullStory}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 rounded-[40px] border border-white/5"
          >
            <h2 className="text-3xl font-display font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 gap-6">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    {i === 0 && <Zap className="w-5 h-5" />}
                    {i === 1 && <CheckCircle2 className="w-5 h-5" />}
                    {i === 2 && <Shield className="w-5 h-5" />}
                    {i === 3 && <Globe className="w-5 h-5" />}
                    {i > 3 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{feature}</p>
                  </div>
                </div>
              ))}
            </div>


          </motion.div>
        </div>
      </div>
    </div>
  );
}
