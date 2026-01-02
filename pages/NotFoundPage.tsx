import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import Logo from '../components/Logo';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="404 - Сторінка не знайдена"
        description="Сторінку не знайдено. Поверніться на головну сторінку dopomoga.me"
      />

      <div className="min-h-screen bg-light flex flex-col items-center justify-center px-4">
        <Logo size={64} variant="icon" className="text-primary mb-8" />

        <h1 className="text-6xl md:text-8xl font-display font-bold text-primary mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-display text-textDark mb-4 text-center">
          Сторінку не знайдено
        </h2>

        <p className="text-textMuted text-center mb-8 max-w-md">
          Вибачте, ця сторінка не існує або була переміщена.
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            На головну
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
