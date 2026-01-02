import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { EXPERT_IMAGE } from '../constants';

const MotionDiv = motion.div as any;

const Bio: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"; 
    e.currentTarget.onerror = null;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-light to-[#EAE6DF] relative overflow-hidden">
      
      {/* 3D-ish background wave simulated with SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
           <path d="M0,1000 C300,800 400,600 600,800 C800,1000 1000,600 1000,0 L1000,1000 Z" fill="#D4A574" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-accent rounded-3xl rotate-6 opacity-20 translate-y-4 translate-x-4 transition-transform group-hover:rotate-3"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img 
                  src={EXPERT_IMAGE} 
                  alt="Паша" 
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60"></div>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-primary mb-6">
              Хто такий Паша?
            </h2>
            
            <div className="space-y-4 text-lg text-textDark/80 mb-8">
              <p>✝️ Пастор з досвідом душепопічництва</p>
              <p>🏠 Сам пережив досвід біженства</p>
              <p>🤝 Служив у реабілітації залежностей</p>
              <p>💬 Говорить українською та російською</p>
            </div>

            <div className="relative p-8 bg-white/50 backdrop-blur-sm rounded-2xl border-l-4 border-accent">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-accent/20" />
              <p className="text-xl italic font-serif text-textDark pt-4">
                "Я знаю, що таке втратити все й починати спочатку. Тому я тут — щоб пройти цей шлях разом з тобою."
              </p>
            </div>
          </MotionDiv>

        </div>
      </div>
    </section>
  );
};

export default Bio;