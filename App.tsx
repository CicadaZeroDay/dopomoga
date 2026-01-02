import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Hero from './components/Hero';
import BibleQuote from './components/BibleQuote';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="font-sans text-textDark min-h-screen bg-light">
        <Hero />
        <BibleQuote />
        <ContactForm />
      </div>
    </LanguageProvider>
  );
};

export default App;
