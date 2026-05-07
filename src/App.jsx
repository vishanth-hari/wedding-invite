import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// --- LUXURY COMPONENTS ---

const RopeSVG = ({ isLeft }) => (
  <svg 
    viewBox="0 0 100 200" 
    className={`absolute top-1/2 -translate-y-1/2 w-28 h-56 z-20 pointer-events-none ${isLeft ? '-right-10' : '-left-10'}`}
    style={{ filter: 'drop-shadow(3px 5px 7px rgba(0,0,0,0.6))' }}
  >
    <path d="M10,60 Q50,0 90,60" fill="none" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round"/>
    <motion.g animate={{ y: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <ellipse cx="50" cy="75" rx="18" ry="22" fill="#D4AF37" stroke="#B8860B" strokeWidth="1"/>
      <rect x="32" y="90" width="36" height="6" rx="3" fill="#B8860B" />
      {[...Array(12)].map((_, i) => (
        <line 
          key={i} 
          x1={38 + (i * 2)} y1="96" 
          x2={35 + (i * 2.5)} y2="150" 
          stroke="#D4AF37" 
          strokeWidth="1.2" 
        />
      ))}
    </motion.g>
  </svg>
);

const LuxuriousCurtainPanel = ({ isLeft, children, ...props }) => {
  return (
    <motion.div
      {...props}
      className="h-full w-1/2 relative"
      style={{
        ...props.style,
        background: `
          repeating-linear-gradient(
            to right,
            rgba(0,0,0,0.2) 0px,
            rgba(0,0,0,0.2) 4px,
            transparent 4px,
            transparent 50px,
            rgba(255,255,255,0.05) 50px,
            rgba(255,255,255,0.05) 54px,
            transparent 54px,
            transparent 100px
          ),
          linear-gradient(to bottom, #5d141a, #8b2635 20%, #721c24)
        `,
        // The shadow helps define the center split
        boxShadow: isLeft ? 'inset -10px 0 30px rgba(0,0,0,0.5)' : 'inset 10px 0 30px rgba(0,0,0,0.5)',
      }}
    >
      <RopeSVG isLeft={isLeft} />
      {children}
    </motion.div>
  );
};

const TennisHeart = () => (
  <motion.div 
    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-16 h-16 flex items-center justify-center mt-6"
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
  <div className="fixed inset-0 z-[100] flex overflow-hidden bg-sand">
    
    {/* Revealed Names - Locked behind curtains */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-[105] p-10 pointer-events-none">
      <motion.h1 exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="text-chettinad-red font-display text-7xl md:text-[130px] font-bold text-center leading-tight">
        H<span className="text-terracotta font-light italic">&</span>S
      </motion.h1>
      <button 
        onClick={onStart} 
        className="pointer-events-auto px-16 py-5 border-2 border-chettinad-red text-chettinad-red font-body tracking-[0.4em] text-[10px] uppercase hover:bg-chettinad-red hover:text-sand transition-all duration-700 rounded-full shadow-xl mt-8"
      >
        ENTER THE JOURNEY
      </button>
    </div>

    {/* Left Curtain - Triangular Pull-back */}
    <LuxuriousCurtainPanel
      isLeft={true}
      initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      exit={{ 
        clipPath: 'polygon(0% 0%, 100% 0%, 0% 0%, 0% 0%)',
        opacity: 0 
      }}
      transition={{ duration: 3.5, ease: [0.77, 0, 0.175, 1] }}
    />
    
    {/* Right Curtain - Triangular Pull-back */}
    <LuxuriousCurtainPanel
      isLeft={false}
      initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      exit={{ 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%)',
        opacity: 0 
      }}
      transition={{ duration: 3.5, ease: [0.77, 0, 0.175, 1] }}
    />

    {/* Decorative Top Border (Fixed) */}
    <div className="absolute top-0 left-0 right-0 h-4 bg-chettinad-red/20 z-[106] backdrop-blur-sm" />
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

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/3m4AdTq26obH9J4T9", "_blank");
  };

  return (
    <main className="relative bg-sand font-body selection:bg-chettinad-red selection:text-sand antialiased">
      {isOpen && <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-chettinad-red z-[150] origin-left" style={{ scaleX }} />}
      <AnimatePresence>{!isOpen && <DrapeOpening onStart={() => setIsOpen(true)} />}</AnimatePresence>

      <div className={`h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth ${!isOpen ? 'overflow-hidden' : ''}`}>
        
        {/* SECTION 1: VISHANTH & SHOBIKA */}
        <Section>
          <KolamPattern className="absolute top-10 left-10 text-chettinad-red" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="text-center z-10 flex flex-col items-center px-4">
            <span className="text-chettinad-red font-body tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">Karaikudi • 2014</span>
            <h1 className="text-5xl md:text-8xl font-display text-chettinad-red mb-4">Vishanth <span className="italic text-terracotta font-light">&</span> Shobika</h1>
            <TennisHeart />
            <p className="mt-10 text-charcoal max-w-sm mx-auto leading-loose text-sm opacity-80 italic text-center">
              Where the echoes of tennis balls at Alagappa Chettiar became the rhythm of our hearts.
            </p>
          </motion.div>
        </Section>

        {/* SECTION 2: THE LONG DISTANCE */}
        <Section className="bg-chettinad-red text-sand">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center">
            <h2 className="text-4xl md:text-5xl font-display mb-10 italic px-4">Across Continents</h2>
            <div className="flex flex-col gap-8 items-center font-display italic text-lg">
              <div className="flex items-center gap-4 text-2xl">
                <span>IIT Indore</span>
                <span className="text-terracotta">→</span>
                <span>Germany</span>
              </div>
              <p className="max-w-xs text-[10px] font-body not-italic opacity-70 tracking-[0.3em] uppercase">
                Eight years of dreams and devotion.
              </p>
            </div>
          </motion.div>
        </Section>

        {/* SECTION 3: THE VENUE DETAILS */}
        <Section>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20">
                <KolamPattern className="text-chettinad-red" />
             </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center z-10 px-4">
            <h2 className="text-chettinad-red font-display text-5xl mb-12 italic underline decoration-terracotta/30 underline-offset-8">The Venue</h2>
            
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="border-b md:border-b-0 md:border-r border-terracotta/20 pb-4 md:pb-0 md:pr-8">
                  <p className="text-terracotta font-body tracking-[0.4em] text-[10px] uppercase font-bold mb-2">Muhurtham</p>
                  <p className="text-chettinad-red font-display text-2xl">6:00 AM — 7:30 AM</p>
                </div>
                
                <div className="md:pl-8">
                  <p className="text-terracotta font-body tracking-[0.4em] text-[10px] uppercase font-bold mb-2">Reception</p>
                  <p className="text-chettinad-red font-display text-2xl">Starts at 6:30 PM</p>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-charcoal font-display text-xl mb-2 italic px-4 leading-tight">Golden Enclave Road, Hosur</p>
                <p className="text-charcoal font-body text-[10px] opacity-60 mb-6 uppercase tracking-widest leading-relaxed">
                  Tamil Nadu 635109
                </p>
                <button 
                  onClick={handleMapClick}
                  className="px-10 py-3 bg-chettinad-red text-sand text-[10px] tracking-[0.3em] uppercase rounded-sm hover:bg-terracotta transition-all shadow-lg active:scale-95"
                >
                  Navigate to Venue
                </button>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* SECTION 4: THE FINISH LINE */}
        <Section className="bg-sand relative border-t border-chettinad-red/10">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-center z-10">
            <h2 className="text-5xl md:text-7xl font-display text-chettinad-red mb-4 uppercase tracking-tighter px-4">June 25, 2026</h2>
            <p className="text-terracotta font-body tracking-[0.4em] text-[10px] uppercase font-bold mb-4">Save Our Date</p>
            <Countdown />
            <div className="mt-16 px-10 py-4 border-2 border-chettinad-red text-chettinad-red font-display italic text-xl">
              Hosur, Tamil Nadu
            </div>
          </motion.div>
        </Section>

      </div>
    </main>
  );
}