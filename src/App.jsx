import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// --- LUXURY ASSETS ---

const RopeSVG = ({ isLeft }) => (
  <svg 
    viewBox="0 0 100 200" 
    className={`absolute top-1/2 -translate-y-1/2 w-24 h-48 z-20 pointer-events-none ${isLeft ? '-right-8' : '-left-8'}`}
    style={{ filter: 'drop-shadow(4px 6px 8px rgba(0,0,0,0.5))' }}
  >
    <path d="M10,60 Q50,0 90,60" fill="none" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round"/>
    <motion.g animate={{ y: [0, 4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <ellipse cx="50" cy="75" rx="18" ry="22" fill="#D4AF37" stroke="#B8860B" strokeWidth="1"/>
      <rect x="32" y="90" width="36" height="6" rx="3" fill="#B8860B" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1={38 + (i * 2)} y1="96" x2={35 + (i * 2.5)} y2="150" stroke="#D4AF37" strokeWidth="1.2" />
      ))}
    </motion.g>
  </svg>
);

const LuxuriousCurtainPanel = ({ isLeft, children, ...props }) => (
  <motion.div
    {...props}
    className="h-full w-1/2 relative"
    style={{
      ...props.style,
      background: `
        repeating-linear-gradient(to right, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 4px, transparent 4px, transparent 50px),
        linear-gradient(to bottom, #5d141a, #8b2635 25%, #721c24)
      `,
      boxShadow: isLeft ? 'inset -15px 0 30px rgba(0,0,0,0.5)' : 'inset 15px 0 30px rgba(0,0,0,0.5)',
    }}
  >
    <RopeSVG isLeft={isLeft} />
    {children}
  </motion.div>
);

const TennisHeart = () => (
  <motion.div 
    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-16 h-16 flex items-center justify-center mt-8"
  >
    <div className="w-12 h-12 bg-[#D4E157] rounded-full border-2 border-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 border-[3px] border-white/40 rounded-full scale-110 translate-x-6"></div>
      <div className="absolute inset-0 border-[3px] border-white/40 rounded-full scale-110 -translate-x-6"></div>
    </div>
    {[...Array(3)].map((_, i) => (
      <motion.span key={i} initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: -40, x: (i - 1) * 20 }}
        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} className="absolute text-chettinad-red text-xl">
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
    <div className="flex justify-center items-center gap-6 mt-10 w-full">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center min-w-[60px]">
          <span className="text-4xl font-display font-bold text-chettinad-red">{value}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
};

const Section = ({ children, className, bgImage }) => (
  <section className={`snap-start min-h-screen w-full flex flex-col items-center justify-center p-10 relative overflow-hidden ${className}`}>
    {bgImage && (
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    )}
    <div className="relative z-10 w-full flex flex-col items-center text-center">
      {children}
    </div>
  </section>
);

// --- MAIN APP ---

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/3m4AdTq26obH9J4T9", "_blank");
  };

  return (
    <main className="relative bg-sand font-body selection:bg-chettinad-red selection:text-sand antialiased overflow-x-hidden">
      {isOpen && <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-chettinad-red z-[150] origin-left" style={{ scaleX }} />}
      
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed inset-0 z-[200] flex overflow-hidden bg-[#1a0507]">
            {/* High Contrast Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[210] p-10 pointer-events-none">
              <motion.div exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
                <h1 className="text-sand font-display text-8xl md:text-[140px] font-bold text-center leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                  H<span className="text-terracotta font-light italic">&</span>S
                </h1>
                <div className="h-1 w-24 bg-terracotta mx-auto my-6 rounded-full shadow-lg" />
              </motion.div>
              
              <button 
                onClick={() => setIsOpen(true)} 
                className="pointer-events-auto px-16 py-5 bg-sand text-chettinad-red font-body tracking-[0.4em] text-[11px] uppercase hover:scale-105 transition-all duration-500 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-12 font-black border-2 border-sand"
              >
                ENTER THE JOURNEY
              </button>
            </div>

            {/* Left Curtain - Triangular Reveal */}
            <LuxuriousCurtainPanel
              isLeft={true}
              initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              exit={{ 
                clipPath: 'polygon(0% 0%, 100% 0%, 0% 0%, 0% 0%)',
                opacity: 0 
              }}
              transition={{ duration: 3.5, ease: [0.77, 0, 0.175, 1] }}
            />
            {/* Right Curtain - Triangular Reveal */}
            <LuxuriousCurtainPanel
              isLeft={false}
              initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              exit={{ 
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%)',
                opacity: 0 
              }}
              transition={{ duration: 3.5, ease: [0.77, 0, 0.175, 1] }}
            />
          </div>
        )}
      </AnimatePresence>

      <div className={`h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth ${!isOpen ? 'overflow-hidden' : ''}`}>
        
        {/* CHAPTER 1: VISHANTH & SHOBIKA */}
        <Section bgImage="/bg1.jpg">
          <KolamPattern className="absolute top-10 left-10 text-chettinad-red" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="text-chettinad-red font-body tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">Karaikudi • 2014</span>
            <h1 className="text-5xl md:text-8xl font-display text-chettinad-red mb-4">Vishanth <span className="italic text-terracotta font-light">&</span> Shobika</h1>
            <div className="flex justify-center"><TennisHeart /></div>
            <p className="mt-10 text-charcoal max-w-sm leading-loose text-sm opacity-80 italic mx-auto">
              Where the echoes of tennis balls at Alagappa Chettiar became the rhythm of our hearts.
            </p>
          </motion.div>
        </Section>

        {/* CHAPTER 2: THE FEAST (Menu) */}
        <Section className="bg-chettinad-red text-sand">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-black/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-4xl font-display mb-10 italic">The Traditional Feast</h2>
            <div className="space-y-6">
              <div>
                <p className="font-display text-2xl text-terracotta italic mb-1">Main Course</p>
                <p className="text-[10px] tracking-widest uppercase opacity-80">Sambar Rice • Curd Rice • Avial • Poriyal</p>
              </div>
              <div className="h-px w-12 bg-sand/20 mx-auto" />
              <div>
                <p className="font-display text-2xl text-terracotta italic mb-1">Chettinad Specials</p>
                <p className="text-[10px] tracking-widest uppercase opacity-80">Kuzhi Paniyaram • Vellai Paniyaram</p>
              </div>
              <div className="h-px w-12 bg-sand/20 mx-auto" />
              <div>
                <p className="font-display text-2xl text-terracotta italic mb-1">Desserts</p>
                <p className="text-[10px] tracking-widest uppercase opacity-80">Elaneer Payasam • Filter Kaapi</p>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* CHAPTER 3: THE VENUE */}
        <Section bgImage="/bg2.jpg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
            <h2 className="text-chettinad-red font-display text-5xl mb-12 italic underline decoration-terracotta/30 underline-offset-8">The Venue</h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="md:pr-8 md:border-r border-terracotta/20">
                  <p className="text-terracotta font-body tracking-[0.4em] text-[10px] uppercase font-bold mb-2">Muhurtham</p>
                  <p className="text-chettinad-red font-display text-3xl">6:00 AM</p>
                </div>
                <div className="md:pl-8">
                  <p className="text-terracotta font-body tracking-[0.4em] text-[10px] uppercase font-bold mb-2">Reception</p>
                  <p className="text-chettinad-red font-display text-3xl">6:30 PM</p>
                </div>
              </div>
              <div className="pt-6">
                <p className="text-charcoal font-display text-2xl mb-2 italic">Golden Enclave Road, Hosur</p>
                <p className="text-charcoal font-body text-[10px] opacity-60 mb-8 uppercase tracking-widest">Tamil Nadu 635109</p>
                <button onClick={handleMapClick} className="px-12 py-4 bg-chettinad-red text-sand text-[11px] tracking-[0.4em] uppercase rounded-full shadow-2xl active:scale-95 transition-transform">
                  Navigate to Venue
                </button>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* CHAPTER 4: THE COUNTDOWN */}
        <Section bgImage="/bg3.jpg" className="bg-sand">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col items-center w-full">
            <h2 className="text-5xl md:text-8xl font-display text-chettinad-red mb-4 uppercase tracking-tighter">June 25, 2026</h2>
            <p className="text-terracotta font-body tracking-[0.5em] text-[11px] uppercase font-black mb-4">Save Our Date</p>
            <Countdown />
            <div className="mt-16 px-12 py-5 border-2 border-chettinad-red text-chettinad-red font-display italic text-2xl">
              Hosur, India
            </div>
          </motion.div>
        </Section>

      </div>
    </main>
  );
}