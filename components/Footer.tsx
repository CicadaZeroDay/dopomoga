import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';
import { Instagram, Send, Mail, Youtube, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// TikTok иконка (нет в lucide-react)
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary pt-20 pb-10 text-white/60">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">dopomoga.me</h3>
            <p className="text-sm mb-4">{t('footer.tagline')}</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-secondary transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              {t('footer.readBlog')}
            </Link>
          </div>

          <div className="flex gap-5">
             <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors" title="Telegram">
               <Send className="w-6 h-6" />
             </a>
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors" title="Instagram">
               <Instagram className="w-6 h-6" />
             </a>
             <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors" title="YouTube">
               <Youtube className="w-6 h-6" />
             </a>
             <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors" title="TikTok">
               <TikTokIcon className="w-6 h-6" />
             </a>
             <a href="mailto:help@dopomoga.me" className="hover:text-secondary transition-colors" title="Email">
               <Mail className="w-6 h-6" />
             </a>
          </div>
        </div>

        <div className="text-center text-xs">
          <p>&copy; {new Date().getFullYear()} dopomoga.me. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;