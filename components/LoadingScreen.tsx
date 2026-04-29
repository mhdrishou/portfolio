'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-48 h-48">
        {/* The 3 Dashes in triangular formation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
                rotate: angle,
                y: [-20, -60, -60, -20]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                times: [0, 0.1, 0.4, 0.5],
                ease: "easeInOut"
              }}
              className="absolute w-2 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ originY: "50%" }}
            />
          ))}
        </motion.div>

        {/* The Broken Circle (4 Arc Segments) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -180 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0, 1, 1, 0],
                scale: [0.8, 0.8, 1, 1.1, 1],
                rotate: angle,
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                times: [0, 0.45, 0.6, 0.9, 1],
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-32 h-32 border-[3px] border-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4),inset_0_0_10px_rgba(255,255,255,0.2)]"
                style={{
                  clipPath: 'polygon(50% 50%, 60% 0, 100% 0, 100% 40%, 50% 50%)',
                  filter: 'blur(0.5px)'
                }}
              />
              {/* Inner Glow Pulse */}
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-32 h-32 border-[1px] border-white/50 rounded-full blur-[2px]"
                style={{
                  clipPath: 'polygon(50% 50%, 60% 0, 100% 0, 100% 40%, 50% 50%)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Center Point Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 text-white/20 tracking-[0.5em] text-xs uppercase font-mono"
      >
        Initializing Core
      </motion.div>
    </div>
  );
}
