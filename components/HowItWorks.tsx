import React from 'react';
import { motion } from 'framer-motion';
import { STEPS } from '../constants';

const MotionDiv = motion.div as any;

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-primary text-light relative">
      <div className="container mx-auto px-4">
        
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-semibold text-4xl md:text-5xl mb-4">
            Три простих кроки
          </h2>
          <p className="text-textMuted text-lg">Шлях до відновлення починається тут</p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-secondary/50 to-transparent z-0" />

          {STEPS.map((step, index) => (
            <MotionDiv
              key={step.id}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-[#1E3A5F] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,144,184,0.2)] border border-secondary/20">
                <step.icon className="w-10 h-10 text-secondary" />
              </div>
              <div className="bg-secondary/10 px-3 py-1 rounded-full text-xs font-bold text-secondary mb-4 tracking-widest uppercase">
                Крок {step.id}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-textMuted leading-relaxed max-w-xs">{step.description}</p>
            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;