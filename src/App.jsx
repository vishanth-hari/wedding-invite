import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// --- COMPONENTS ---

const DrapeOpening = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden">
      {/* Left Panel */}
      <motion.div
        exit={{ x: '-100%' }}
        transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1] }}
        className="h-full w-1/2 bg-chettinad-red flex items-center justify-end relative border-r border-sand/10"
      >
        <motion.div 
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 1 }}
          className="text-sand font-display text-6xl md:text-8xl mr-2 z-10 font-bold"
        >
          H
        </motion.div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        exit={{ x: '100%' }}
        transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1] }}
        className="h-full w-1/2 bg-chettinad-red flex items-center justify-start relative border-l border-sand/10"
      >
        <motion.div 
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 1 }}
          className="flex items-baseline"
        >
          <span className="text-terracotta font-display text-4xl md:text-5xl mr-2 font-light italic">&</span>
          <span className="text-sand font-display text-6xl md:text-8xl z-10 font-bold">S</span>
        </motion.div>
      </motion.div>

      {/* Interaction Button */}
      <motion.div 
        exit={{ opacity: 0, y: 20 }}
        className="absolute inset-0 z-[110] flex items-center justify-center"
      >
        <button 
          onClick={onStart}
          className="mt-64 px-10 py-4 border border-sand/30 text-sand font-body tracking-[0.4em] text-[10px] uppercase hover:bg-sand hover:text-chettinad-red transition-all duration-700 backdrop-blur-md rounded-full"
        >
          Enter the Journey
        </button>
      </motion.div>
    </div>
  );
};

const Section = ({ children, className }) => (
  <section className={`snap-start min-h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

// --- MAIN APP ---

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  return (
    <main className="relative bg-sand selection:bg-chettinad-red selection:text-sand font-body">
      
      {isOpen && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1.5 bg-chettinad-red z-[150] origin-left"
          style={{ scaleX }}
        />
      )}

      <AnimatePresence>
        {!isOpen && <DrapeOpening onStart={() => setIsOpen(true)} />}
      </AnimatePresence>

      <div className={`h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth ${!isOpen ? 'overflow-hidden' : ''}`}>
        
        {/* SECTION 1: THE MEET */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <span className="text-chettinad-red font-body tracking-[0.4em] text-[10px] uppercase mb-6 block opacity-60">
              Karaikudi • 2014
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-chettinad-red mb-6">
              Vishanth <span className="italic text-terracotta font-light">&</span> Shobika
            </h1>
            <p className="text-charcoal font-body max-w-xs mx-auto leading-loose opacity-80 text-sm">
              It began at Alagappa Chettiar. 
              A journey born on the tennis courts, destined for the world.
            </p>
          </motion.div>
          <div className="absolute bottom-10 animate-bounce text-chettinad-red/40 text-[9px] tracking-[0.3em] uppercase">
            Scroll to Explore
          </div>
        </Section>

        {/* SECTION 2: LONG DISTANCE */}
        <Section className="bg-chettinad-red text-sand">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-center"
          >
            <h2 className="text-4xl font-display mb-12">The Long Distance</h2>
            <div className="space-y-8 text-[10px] tracking-[0.2em] uppercase opacity-80">
              <div className="flex items-center justify-between w-72 border-b border-sand/10 pb-4">
                <span className="font-bold">IIT Indore</span>
                <span className="text-terracotta text-lg">→</span>
                <span className="font-bold">Germany</span>
              </div>
              <div className="flex items-center justify-between w-72 border-b border-sand/10 pb-4">
                <span className="font-bold">UPSC Prep</span>
                <span className="text-terracotta text-lg">•</span>
                <span className="font-bold">3 Years</span>
              </div>
            </div>
            <p className="mt-12 max-w-xs mx-auto italic font-display text-lg opacity-70">
              "Distance means so little when someone means so much."
            </p>
          </motion.div>
        </Section>

        {/* SECTION 3: THE BREAKTHROUGH */}
        <Section>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-charcoal p-8 text-sand flex flex-col justify-center rounded-sm"
            >
              <span className="text-4xl font-display text-terracotta">18</span>
              <span className="text-[9px] uppercase tracking-widest mt-2 opacity-60">Months of Search</span>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="border border-chettinad-red p-8 text-chettinad-red flex flex-col justify-center rounded-sm"
            >
              <span className="text-4xl font-display">01</span>
              <span className="text-[9px] uppercase tracking-widest mt-2 opacity-60">Dream Career</span>
            </motion.div>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="col-span-2 bg-chettinad-red p-10 text-sand text-center rounded-sm"
            >
              <h3 className="text-2xl font-display mb-4 italic">The Breakthrough</h3>
              <p className="text-xs opacity-80 leading-relaxed font-body tracking-wide">
                Six months ago, the final piece fell into place. 
                Germany is now the beginning of our forever.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* SECTION 4: THE BIG REVEAL */}
        <Section className="bg-sand">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-center border-[0.5px] border-chettinad-red/30 p-16 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand px-6 text-chettinad-red font-semibold tracking-[0.4em] text-[9px] uppercase">
              Save The Date
            </div>
            <h2 className="text-5xl font-display text-chettinad-red mb-4 uppercase tracking-tighter">Coming Home</h2>
            <p className="text-charcoal font-body mb-10 tracking-[0.3em] text-[10px] opacity-60 uppercase">July 2026 • Chennai</p>
            <div className="text-chettinad-red text-xl font-display italic">
              Formal Invitation to Follow
            </div>
          </motion.div>
        </Section>

      </div>
    </main>
  );
}