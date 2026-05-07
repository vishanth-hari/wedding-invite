import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

// --- CUTE ANIMATION COMPONENT ---
const TennisHeart = () => (
  <motion.div 
    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-16 h-16 flex items-center justify-center"
  >
    {/* The Ball */}
    <div className="w-12 h-12 bg-[#D4E157] rounded-full border-2 border-white shadow-lg relative overflow-hidden">
      {/* Tennis Seams */}
      <div className="absolute inset-0 border-[3px] border-white/40 rounded-full scale-110 translate-x-6"></div>
      <div className="absolute inset-0 border-[3px] border-white/40 rounded-full scale-110 -translate-x-6"></div>
    </div>
    {/* The Floating Hearts */}
    {[...Array(3)].map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: -40, x: (i - 1) * 20 }}
        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
        className="absolute text-chettinad-red text-xl"
      >
        ❤️
      </motion.span>
    ))}
  </motion.div>
);

const KolamPattern = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`opacity-10 ${className}`} width="150" height="150">
    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("2026-06-25T00:00:00"); 
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target - now;
      if (difference <= 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6 mt-10">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-3xl font-display font-bold text-chettinad-red">{value}</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-terracotta font-semibold">{label}</span>
        </div>
      ))}
    </div>
  );
};

const DrapeOpening = ({ onStart }) => (
  <div className="fixed inset-0 z-[100] flex overflow-hidden">
    <motion.div exit={{ x: '-100%' }} transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] }}
      className="h-full w-1/2 bg-chettinad-red flex items-center justify-end border-r-2 border-terracotta/30">
      <motion.div exit={{ opacity: 0, x: -20 }} className="text-sand font-display text-7xl md:text-9xl mr-4 z-10 font-bold">H</motion.div>
    </motion.div>
    <motion.div exit={{ x: '100%' }} transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] }}
      className="h-full w-1/2 bg-chettinad-red flex items-center justify-start border-l-2 border-terracotta/30">
      <motion.div exit={{ opacity: 0, x: 20 }} className="flex items-baseline">
        <span className="text-terracotta font-display text-4xl md:text-6xl mr-2 font-light italic">&</span>
        <span className="text-sand font-display text-7xl md:text-9xl z-10 font-bold">S</span>
      </motion.div>
    </motion.div>
    <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-[110] flex flex-col items-center justify-center">
      <button onClick={onStart} className="mt-72 px-12 py-4 border border-sand/40 text-sand font-body tracking-[0.4em] text-[10px] uppercase hover:bg-sand hover:text-chettinad-red transition-all duration-700 backdrop-blur-md rounded-full shadow-2xl">
        Ammantranam
      </button>
    </motion.div>
  </div>
);

const Section = ({ children, className }) => (
  <section className={`snap-start min-h-screen w-full flex flex-col items-center justify-center p-10 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

// --- MAIN APP ---

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  return (
    <main className="relative bg-sand font-body selection:bg-chettinad-red selection:text-sand">
      {isOpen && <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-chettinad-red z-[150] origin-left" style={{ scaleX }} />}
      
      <AnimatePresence>{!isOpen && <DrapeOpening onStart={() => setIsOpen(true)} />}</AnimatePresence>

      <div className={`h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth ${!isOpen ? 'overflow-hidden' : ''}`}>
        
        {/* CHAPTER 1: THE START */}
        <Section>
          <KolamPattern className="absolute top-10 left-10 text-chettinad-red" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="text-center z-10 flex flex-col items-center">
            <span className="text-chettinad-red font-body tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">Karaikudi • 2014</span>
            <h1 className="text-6xl md:text-8xl font-display text-chettinad-red mb-6">The First Rally</h1>
            
            {/* CUTE ANIMATION HERE */}
            <TennisHeart />

            <p className="mt-6 text-charcoal max-w-xs mx-auto leading-loose text-sm opacity-80 italic">
              Where the echoes of tennis balls at Alagappa Chettiar became the rhythm of our hearts.
            </p>
          </motion.div>
        </Section>

        {/* CHAPTER 2: THE LONG DISTANCE */}
        <Section className="bg-chettinad-red text-sand">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center">
            <h2 className="text-5xl font-display mb-10">Across Continents</h2>
            <div className="flex flex-col gap-8 items-center font-display italic text-lg">
              <div className="flex items-center gap-4">
                <span>IIT Indore</span>
                <span className="text-terracotta text-2xl">→</span>
                <span>Germany</span>
              </div>
              <div className="w-16 h-px bg-sand/20" />
              <p className="max-w-xs text-sm font-body not-italic opacity-70 tracking-widest uppercase">
                Eight years of dreams, distance, and devotion.
              </p>
            </div>
          </motion.div>
        </Section>

        {/* CHAPTER 3: THE TEMPLE PHOTO (MODERN STYLE) */}
        <Section className="p-0">
           <div className="relative w-full h-full flex items-center justify-center">
              {/* IMAGE PLACEHOLDER: Replace 'temple.jpg' with your filename */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75"
                style={{ backgroundImage: "url('/temple.jpg')" }} 
              />
              <div className="absolute inset-0 bg-chettinad-red/40 mix-blend-multiply" />
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="relative z-10 text-center bg-sand/90 p-8 backdrop-blur-md"
              >
                <span className="text-chettinad-red font-body tracking-[0.4em] text-[10px] uppercase block mb-2">Our Roots</span>
                <h3 className="text-chettinad-red font-display text-4xl italic">Chennai</h3>
              </motion.div>
           </div>
        </Section>

        {/* CHAPTER 4: THE WEDDING */}
        <Section className="bg-sand relative">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-center z-10">
            <h2 className="text-5xl md:text-7xl font-display text-chettinad-red mb-4">June 25, 2026</h2>
            <p className="text-terracotta font-body tracking-[0.4em] text-[10px] uppercase font-bold">Save Our Date • Chennai</p>
            <Countdown />
            <div className="mt-16 px-10 py-4 border-2 border-chettinad-red text-chettinad-red font-display italic text-xl">
              We're Getting Married!
            </div>
          </motion.div>
        </Section>

      </div>
    </main>
  );
}

