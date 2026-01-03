import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MotionH2 = motion.h2 as any;
const MotionDiv = motion.div as any;

// Gradient avatars based on name
const GRADIENTS = [
  'from-blue-400 to-purple-500',
  'from-green-400 to-teal-500',
  'from-orange-400 to-pink-500',
  'from-indigo-400 to-blue-500',
  'from-rose-400 to-red-500',
];

const getGradient = (name: string) => {
  const index = name.charCodeAt(0) % GRADIENTS.length;
  return GRADIENTS[index];
};

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-light overflow-hidden">
      <div className="container mx-auto px-4">
        <MotionH2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-semibold text-4xl text-center text-primary mb-16"
        >
          {t('testimonials.title')}
        </MotionH2>

        <div className="flex flex-wrap justify-center gap-6">
          {REVIEWS.map((review, index) => (
            <MotionDiv
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 max-w-md flex-1 min-w-[300px] relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

              <div className="flex gap-1 text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-textDark/80 mb-6 italic min-h-[80px]">"{review.text}"</p>
              <div className="flex items-center gap-3">
                {/* Gradient avatar */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradient(review.author)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {review.author[0]}
                </div>
                <div>
                  <div className="font-bold text-primary">{review.author}</div>
                  <div className="text-xs text-textMuted uppercase tracking-wide">{review.role}</div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;