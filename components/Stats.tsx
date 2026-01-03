import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const MotionDiv = motion.div as any;

interface StatItem {
  number: string;
  labelKey: string;
  isCounter?: boolean;
  target?: number;
}

const STATS: StatItem[] = [
  { number: '100+', labelKey: 'stats.supported', isCounter: true, target: 100 },
  { number: '5+', labelKey: 'stats.years', isCounter: true, target: 5 },
  { number: '12', labelKey: 'stats.countries', isCounter: true, target: 12 },
  { number: '24/7', labelKey: 'stats.available', isCounter: false },
];

const CounterNumber: React.FC<{ target: number; suffix?: string; inView: boolean }> = ({
  target,
  suffix = '+',
  inView
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 50;
    const increment = target / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, inView]);

  return <span>{count}{suffix}</span>;
};

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <MotionDiv
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display font-bold text-4xl md:text-5xl text-primary mb-2">
                {stat.isCounter && stat.target ? (
                  <CounterNumber
                    target={stat.target}
                    suffix={stat.number.includes('+') ? '+' : ''}
                    inView={inView}
                  />
                ) : (
                  stat.number
                )}
              </p>
              <p className="text-textMuted text-sm md:text-base">{t(stat.labelKey)}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
