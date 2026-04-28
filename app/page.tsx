// src/app/page.tsx
'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import useSound from 'use-sound';
import { Heart, Stars, MapPin, Dog, Music4, Lock, Unlock } from 'lucide-react';
import Image from 'next/image';
import FloatingElements from './components/FloatingElements';

// --- CONFIGURATION ---
const CORRECT_PASSWORD = "BabyJean";
const MUSIC_URL = '/music/yellow.mp3'; // PLACE YOUR MP3 HERE

// --- VARIANTS FOR REUSABLE ANIMATIONS ---
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as any // The 'as any' fixes the easing error
    } 
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
export default function OurStoryPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Music interaction setup
  const [play, { stop, sound }] = useSound(MUSIC_URL, { volume: 0.4, loop: true });
  const [musicPlaying, setMusicPlaying] = useState(false);

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setError(false);
      setAuthorized(true);
      if (!musicPlaying) {
        play(); // Autoplay starts on successful login interaction
        setMusicPlaying(true);
      }
    } else {
      setError(true);
      setPassword("");
      // Subtle shake animation could be added here
    }
  };

  const handleMusicToggle = () => {
    if (musicPlaying) {
      stop();
    } else {
      play();
    }
    setMusicPlaying(!musicPlaying);
  };

  // Only use scroll hook when authorized
  const mainRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({ 
  target: authorized ? mainRef : undefined 
});
  const scaleProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // --- PASSWORD GATE SCREEN ---
  if (!authorized) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
        <FloatingElements />
        <motion.div 
          className="z-10 p-10 bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10 shadow-soft-glow w-full max-w-md flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <Heart size={64} className="text-romantic-accent fill-romantic-accent drop-shadow-lg" />
          </motion.div>
          
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-sunset-gradient mb-3 text-center">
            Unlock Our Moments
          </h1>
          <p className="text-white/70 mb-8 text-center text-sm">Welcome back. Enter the nickname known only to us... 💛</p>
          
          <div className="relative w-full mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your nickname..."
              className={`w-full px-5 py-4 bg-white/5 border rounded-full text-white placeholder-white/40 focus:ring-2 focus:ring-romantic-pink outline-none transition duration-300 ${error ? 'border-red-500 animate-shake' : 'border-white/10'}`}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error ? (
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            ) : (
              <Unlock className="absolute right-5 top-1/2 -translate-y-1/2 text-romantic-pink opacity-60" size={20} />
            )}
          </div>
          
          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-romantic-accent rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition duration-300 hover:shadow-soft-glow"
          >
            Open Heart <Heart size={18} />
          </motion.button>
          
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs mt-4 text-center"
              >
                That doesn't sound like you... Try again, my Drama Queen 😄
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    );
  }

  // --- AUTHORIZED WEBSITE CONTENT ---
  return (
    <main ref={mainRef} className="relative min-h-screen w-full font-sans antialiased text-white">
      <FloatingElements />
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 bg-background z-[-2]" />
      <motion.div style={{ scale: scaleProgress }} className="fixed inset-0 z-[-1] bg-dreamy-glow opacity-30" />

      {/* Music Control - Hidden aesthetic */}
      <button 
        onClick={handleMusicToggle}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-soft-glow"
      >
        {musicPlaying ? <Music4 className="text-romantic-yellow" /> : <Music4 className="text-white/40" />}
      </button>

      {/* 💛 HERO SECTION 💛 */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center flex flex-col items-center z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <Heart size={80} className="text-romantic-accent fill-romantic-accent drop-shadow-[0_0_15px_rgba(233,30,99,0.7)]" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-sunset-gradient drop-shadow-yellow-glow">Story</span> <span className="text-romantic-yellow drop-shadow-yellow-glow">💛</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12 font-medium">
            A beautiful journey that started with <span className="text-romantic-pink">one random moment</span>... and became my entire world.
          </p>

          <motion.a
            href="#timeline"
            whileHover={{ y: 5 }}
            className="p-3 border border-romantic-yellow/50 rounded-full animate-subtle-pulse"
          >
            <span className="text-4xl text-romantic-yellow">👇</span>
          </motion.a>
        </motion.div>
      </section>

      {/* 💛 TIMELINE SECTION 💛 */}
      <section id="timeline" className="py-24 px-6 md:px-12 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 z-0" /> {/* Central line */}
        
        <motion.h2 
          className="text-5xl font-extrabold text-center mb-20 text-white drop-shadow-sm"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
        >
          Key Moments
        </motion.h2>

        <div className="space-y-24 relative z-10 max-w-6xl mx-auto">
          {/* Milestone 1: Feb 26 */}
          <TimelineItem
            date="February 26"
            title="The Spark"
            description="The fateful day we met on Chatroulette. Random scrolling led me straight to you, and we immediately swapped Instagrams. Best decision ever."
            image="/images/timeline-met.jpg" // Place your image here
            icon={<MapPin />}
            align="right"
          />

          {/* Milestone 2: Video Calls */}
          <TimelineItem
            date="Every Week"
            title="Distance Means Nothing"
            description="Those long hours on video calls... 3–4 times every single week. Getting to know your smile, your dramatics, and falling for you more each time."
            image="/images/timeline-calls.jpg"
            icon={<Music4 />}
            align="left"
          />

          {/* Milestone 3: March 19 Proposal */}
          <TimelineItem
            date="March 19"
            title="The Online 'Yes'"
            description="The day I got nervous and proposed to you online. It wasn't fancy, but it was honest. And you said yes, making me the happiest guy in India (and the world)."
            image="/images/timeline-proposal.jpg"
            icon={<Heart className="fill-romantic-accent text-romantic-accent"/>}
            align="right"
            glow={true}
          />
        </div>
      </section>

      {/* 💛 MEMORIES / ABOUT HER 💛 */}
      <section className="py-24 px-6 md:px-12 bg-black/30 backdrop-blur-sm relative border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-5xl font-extrabold mb-10 text-white">About Her <span className="text-romantic-accent">✨</span></h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              She's caring, lovely, and yes, a little dramatic 😄. I call her my <span className="text-romantic-yellow font-semibold">“Drama Queen”</span> playfully, because life with her is never boring.
            </p>
            
            <div className="space-y-5 text-white/80">
              <div className="flex items-center gap-3"><MapPin className="text-romantic-pink" size={20}/> <span>Piyanagan Norte, Tubigon, Bohol, Philippines</span></div>
              <div className="flex items-center gap-3"><Music4 className="text-romantic-yellow" size={20}/> <span>Coldplay, Bruno Mars, One Direction</span></div>
              <div className="flex items-center gap-3"><Dog className="text-romantic-peach" size={20}/> <span>Her dog, Oreo 🐶 (Yes, inspired by 1D!)</span></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <div className="absolute -inset-2 bg-sunset-gradient opacity-30 blur-2xl group-hover:opacity-50 transition duration-500 rounded-3xl" />
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 aspect-[4/5] shadow-2xl">
              <Image src="/images/jean-about.jpg" alt="Jean" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              <p className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow-lg">Moments I never want to lose 💛</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 💛 FUTURE DREAMS 💛 */}
      <section className="py-24 px-6 md:px-12 relative min-h-[70vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[url('/images/stars-bg.png')] opacity-20" />
        
        <motion.h2 
          className="text-5xl font-extrabold text-center mb-16 text-white drop-shadow-yellow-glow z-10"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          Future Dreams <Stars className="inline text-romantic-yellow"/>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full z-10">
          <DreamCard title="Traveling Together" description="Exploring new places, side by side." emoji="✈️" delay={0.1} />
          <DreamCard title="Late-night Talks" description="When the world sleeps, we talk about everything." emoji="🌙" delay={0.2} />
          <DreamCard title="Growing Forever" description="Building a life we both love, every day." emoji="🏡" delay={0.3} />
        </div>
      </section>

      {/* 💛 POETRY / LOVE SECTION + EASTER EGG 💛 */}
      <section className="py-32 px-6 md:px-12 bg-black/40 backdrop-blur-lg border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dreamy-glow z-0" />
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          
          <motion.p
            className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed max-w-xl italic mb-16 relative"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            { "You are my heaven\nYou are my passion\nYou are my prayer\nYou are the peace of my soul".split('\n').map((line, i) => (
              <motion.span key={i} className="block" variants={{ hidden: {opacity:0, y:10}, visible: {opacity:1, y:0} }}>{line}</motion.span>
            ))}
            <Heart size={16} className="absolute -right-6 -top-4 text-romantic-accent animate-pulse"/>
          </motion.p>

          {/* THE IMPORTANT EASTER EGG 👑 */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
              onClick={() => setShowEasterEgg(true)}
              className="cursor-pointer mb-10"
              title="A secret for you..."
            >
              <Heart size={40} className="text-white/20 fill-white/10 hover:text-romantic-accent/50 transition-colors" />
            </motion.div>
            
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 50 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="fixed inset-0 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm z-[100]"
                  onClick={() => setShowEasterEgg(false)} // Click outside to close
                >
                  <motion.div 
                    className="p-10 bg-background rounded-3xl border border-romantic-yellow shadow-yellow-glow max-w-lg text-center"
                    onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
                  >
                    <span className="text-6xl mb-6 block animate-bounce">👑</span>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-sunset-gradient mb-5">My Drama Queen</p>
                    <p className="text-lg text-white/80 leading-relaxed font-medium">
                      Even when we fight, even when things are tough... <span className="text-white font-semibold">I still choose you. Always. 💛</span>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.p 
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-sunset-gradient font-mono tracking-tighter"
            animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 3, repeat: Infinity }}
          >
            I love you.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white/20 text-xs border-t border-white/5">
        A small window into our universe 💛 Designed for BabyJean.
      </footer>
    </main>
  );
}

// --- HELPER COMPONENT: TimelineItem ---
function TimelineItem({ date, title, description, image, icon, align, glow = false }: any) {
  const isRight = align === 'right';
  return (
    <motion.div 
      className={`flex flex-col md:flex-row items-center gap-10 w-full ${isRight ? '' : 'md:flex-row-reverse'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: { opacity: 0, x: isRight ? 50 : -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
      }}
    >
      <div className={`w-full md:w-1/2 flex ${isRight ? 'md:justify-end' : 'md:justify-start'}`}>
        <div className={`relative rounded-3xl overflow-hidden border-2 border-white/10 ${glow ? 'shadow-soft-glow border-romantic-accent/20' : ''}`}>
          <Image src={image} alt={title} width={400} height={300} className="object-cover aspect-[4/3]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
          <span className="absolute bottom-4 left-4 text-sm font-mono text-white/60 bg-black/60 px-3 py-1 rounded-full">{date}</span>
        </div>
      </div>
      
      {/* Icon Bubble */}
      <div className="absolute left-1/2 -translate-x-1/2 p-3 bg-background rounded-full border-2 border-white/10 z-20">
        {icon && <div className="text-romantic-yellow">{icon}</div>}
      </div>

      <div className={`w-full md:w-1/2 flex flex-col ${isRight ? 'md:items-start text-left' : 'md:items-end text-right'}`}>
        <h4 className={`text-3xl font-bold mb-4 ${glow ? 'text-transparent bg-clip-text bg-sunset-gradient' : 'text-white'}`}>{title}</h4>
        <p className="text-white/80 max-w-md">{description}</p>
      </div>
    </motion.div>
  );
}

// --- HELPER COMPONENT: DreamCard ---
function DreamCard({ title, description, emoji, delay }: any) {
  return (
    <motion.div
      className="p-8 bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 text-center flex flex-col items-center transition-all duration-300 hover:border-romantic-yellow/30 hover:shadow-yellow-glow"
      variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      <span className="text-6xl mb-6 block animate-float">{emoji}</span>
      <h5 className="text-2xl font-bold text-white mb-3">{title}</h5>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
}