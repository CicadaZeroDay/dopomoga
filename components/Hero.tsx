import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundAnimation from './BackgroundAnimation';
import Logo from './Logo';
import { Shield, Heart, MessageCircle, BookOpen } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { EXPERT_IMAGE } from '../constants';

const MotionDiv = motion.div as any;

const Hero: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
    e.currentTarget.onerror = null;
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'ua', label: 'UA' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-light">
      <BackgroundAnimation />

      {/* Professional Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size={32} variant="icon" className="text-primary" />
            <span className="font-display font-semibold text-textDark text-lg hidden sm:block">dopomoga</span>
          </div>

          {/* Language Switcher - Refined */}
          <div className="flex items-center gap-0.5 bg-gray-50 rounded-full p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  language === lang.code
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-textMuted hover:text-textDark'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/blog"
              className="flex items-center gap-2 px-4 py-2 text-textMuted hover:text-primary text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {t('nav.blog')}
            </Link>
            <button
              onClick={scrollToForm}
              className="flex items-center gap-2 px-5 py-2 text-primary text-sm font-medium rounded-full border border-primary/20 hover:bg-primary/5 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              {t('nav.book')}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Column - Text */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                {t('hero.subtitle')}
              </p>

              {/* Main Headline */}
              <h1 className="font-display font-semibold text-4xl md:text-5xl text-textDark leading-tight tracking-tight">
                {t('hero.title1')}
                <br />
                <span className="text-primary">{t('hero.title2')}</span>
              </h1>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6"
            >
              {/* Description */}
              <p className="text-textMuted text-lg leading-relaxed">
                {t('hero.description1')}
                <br className="hidden sm:block" />
                {t('hero.description2')}
              </p>
            </MotionDiv>

            {/* Trust indicators */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-textMuted text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span>{t('hero.anonymous')}</span>
              </div>
              <div className="flex items-center gap-2 text-textMuted text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span>{t('hero.noJudgment')}</span>
              </div>
              <div className="flex items-center gap-2 text-textMuted text-sm">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="text-secondary text-xs font-bold">₴0</span>
                </div>
                <span>{t('hero.free')}</span>
              </div>
            </MotionDiv>

            {/* CTA Button */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10"
            >
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                {t('hero.cta')}
              </button>
            </MotionDiv>
          </div>

          {/* Right Column - Photo */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              {/* Photo container with professional treatment */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
                <img
                  src={EXPERT_IMAGE}
                  alt={t('hero.photoAlt')}
                  onError={handleImageError}
                  className="w-auto h-[450px] md:h-[550px] object-cover object-top"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>

              {/* Stats badge - more subtle */}
              <div className="absolute -bottom-4 -left-4 md:-left-6 bg-white rounded-xl px-4 py-3 shadow-lg shadow-black/5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-textDark text-sm">100+</p>
                    <p className="text-textMuted text-xs">{t('hero.supported')}</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Hero;
