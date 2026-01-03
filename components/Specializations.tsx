import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Wine, Plane, Users, User, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MotionDiv = motion.div as any;

interface Specialization {
  icon: React.FC<{ className?: string }>;
  titleKey: string;
  descKey: string;
}

const SPECIALIZATIONS: Specialization[] = [
  { icon: Brain, titleKey: 'spec.ptsd', descKey: 'spec.ptsdDesc' },
  { icon: Wine, titleKey: 'spec.addiction', descKey: 'spec.addictionDesc' },
  { icon: Plane, titleKey: 'spec.migration', descKey: 'spec.migrationDesc' },
  { icon: Users, titleKey: 'spec.family', descKey: 'spec.familyDesc' },
  { icon: User, titleKey: 'spec.identity', descKey: 'spec.identityDesc' },
  { icon: Briefcase, titleKey: 'spec.business', descKey: 'spec.businessDesc' },
];

const Specializations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-semibold text-4xl md:text-5xl mb-4 text-primary">
            {t('spec.title')}
          </h2>
          <p className="text-textMuted text-lg max-w-2xl mx-auto">
            {t('spec.subtitle')}
          </p>
          <div className="h-1 w-24 bg-secondary mx-auto rounded-full mt-6" />
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALIZATIONS.map((spec, index) => (
            <MotionDiv
              key={spec.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-light to-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <spec.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-textDark mb-3">
                {t(spec.titleKey)}
              </h3>
              <p className="text-textMuted leading-relaxed">
                {t(spec.descKey)}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specializations;
