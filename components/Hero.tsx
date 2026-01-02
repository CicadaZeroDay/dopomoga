import React from 'react';
import { motion } from 'framer-motion';
import BackgroundAnimation from './BackgroundAnimation';
import { ArrowRight, Users } from 'lucide-react';
import { SOCIAL_LINKS, EXPERT_IMAGE } from '../constants';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const Hero: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"; // Fallback image
    e.currentTarget.onerror = null; // Prevent infinite loop
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
        
        {/* Main Content Wrapper for the 'Sandwich' effect */}
        <div className="relative w-full max-w-6xl flex flex-col items-center justify-center -space-y-12 md:-space-y-20 lg:-space-y-24">
          
          {/* Top Text Layer - 'Behind' feel */}
          <MotionH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] text-light/10 text-center leading-none tracking-tight relative z-0 select-none"
          >
            ТВОЯ ДУША
          </MotionH1>

          {/* Image Container - Centerpiece */}
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Gold/Warm Glow behind to match photo background lights */}
            <div className="absolute inset-0 bg-[#D4A574] rounded-full blur-[100px] opacity-40 animate-pulse" />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full p-2 bg-gradient-to-b from-secondary/50 to-primary/50 backdrop-blur-sm shadow-2xl shadow-black/50">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 relative bg-primary/50">
                 <img 
                   src={EXPERT_IMAGE}
                   alt="Паша" 
                   onError={handleImageError}
                   className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700 ease-in-out block"
                 />
                 {/* Inner shadow for depth */}
                 <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(10,22,40,0.5)] rounded-full pointer-events-none" />
              </div>
            </div>
            
            {/* Decorative floating label */}
            <MotionDiv 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, ease: "easeOut" }}
              className="absolute -right-4 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 text-light px-4 py-2 rounded-xl text-sm font-medium hidden md:block"
            >
              👋 Привіт, я Паша
            </MotionDiv>
          </MotionDiv>

          {/* Bottom Text Layer - 'In Front' feel */}
          <MotionH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-light to-secondary text-center leading-none tracking-tight relative z-20 drop-shadow-2xl"
          >
            НАША ТУРБОТА
          </MotionH1>

        </div>

        {/* Subtext and CTA */}
        <div className="mt-16 md:mt-24 text-center max-w-lg z-30 flex flex-col items-center">
          <MotionP 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-secondary font-medium mb-8 tracking-wide"
          >
            Безпечний простір для розмови українською
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <a 
              href={SOCIAL_LINKS.calendar}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-secondary text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:bg-secondary/90 hover:scale-105 shadow-[0_0_30px_rgba(74,144,184,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Записатися на безкоштовну бесіду <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </a>
          </MotionDiv>

          {/* Social Proof */}
          <MotionDiv 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1.2 }}
             className="mt-8 flex items-center justify-center gap-3 text-textMuted text-sm"
          >
             <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-9 h-9 rounded-full border-2 border-primary bg-gray-700 overflow-hidden relative">
                    {/* Placeholder avatars */}
                    <img src={`https://picsum.photos/id/${100+i}/50/50`} alt="" className="w-full h-full object-cover opacity-80" />
                 </div>
               ))}
             </div>
             <div className="flex items-center gap-1.5 pl-2">
               <Users className="w-4 h-4 text-accent" />
               <span className="font-medium text-light/80">100+ українців знайшли підтримку</span>
             </div>
          </MotionDiv>
        </div>

      </div>
    </section>
  );
};

export default Hero;