'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    title: "Web Dev",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js"]
  },
  {
    title: "Design",
    skills: ["UI/UX Design", "Figma", "Responsive Design", "Vibe Coding", "Prototyping"]
  },
  {
    title: "AI & Integrations",
    skills: ["OpenAI API", "Claude API", "AI Chatbot Dev", "Prompt Engineering", "AI Workflow Automation"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "Netlify", "WordPress", "Webflow", "VS Code"]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="py-24" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-2xl font-display font-bold mb-6 text-primary">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 10,
                      delay: (groupIndex * 0.1) + (skillIndex * 0.05) 
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(91, 196, 245, 0.2)" }}
                    className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
