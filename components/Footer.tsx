import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Instagram, Send, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary pt-20 pb-10 text-white/60">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">dopomoga.me</h3>
            <p className="text-sm">Твоя душа, наша турбота</p>
          </div>
          
          <div className="flex gap-6">
             <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">
               <Send className="w-6 h-6" />
             </a>
             <a href="#" className="hover:text-secondary transition-colors">
               <Instagram className="w-6 h-6" />
             </a>
             <a href="mailto:help@dopomoga.me" className="hover:text-secondary transition-colors">
               <Mail className="w-6 h-6" />
             </a>
          </div>
        </div>

        <div className="text-center text-xs">
          <p>&copy; {new Date().getFullYear()} dopomoga.me. Всі права захищено.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;