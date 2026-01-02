import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const MotionDiv = motion.div as any;

const BibleQuote: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-light to-[#F5F0EB]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-[1px] bg-primary/30" />
            <div className="mx-4">
              <svg className="w-6 h-6 text-primary/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z" />
              </svg>
            </div>
            <div className="w-12 h-[1px] bg-primary/30" />
          </div>

          {/* Quote */}
          <blockquote className="relative">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-textDark/80 leading-relaxed italic">
              {t('footer.quote')}
            </p>
          </blockquote>

          {/* Source */}
          <p className="mt-6 text-primary font-medium tracking-wide">
            {t('footer.quoteSource')}
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default BibleQuote;
