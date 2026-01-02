import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

const MotionDiv = motion.div as any;

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#F0EEE6]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-display font-semibold text-4xl text-center text-primary mb-12">
          Часті запитання
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-primary">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="w-5 h-5 text-secondary flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-textMuted flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <MotionDiv
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-textDark/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;