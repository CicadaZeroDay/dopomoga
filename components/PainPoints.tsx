import React from 'react';
import { motion } from 'framer-motion';
import { PAIN_POINTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const MotionDiv = motion.div as any;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const PainPoints: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-light text-textDark relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-semibold text-4xl md:text-5xl mb-4 text-primary">
            {t('painPoints.title')}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAIN_POINTS.map((item, index) => (
            <MotionDiv
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <item.icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
              </div>
              <p className="font-medium text-lg text-textDark">{item.title}</p>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-display font-medium text-textMuted">
            {t('painPoints.subtitle')}
          </p>
        </MotionDiv>
      </div>
    </section>
  );
};

export default PainPoints;