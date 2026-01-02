import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ua' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ua: {
    // Hero
    'hero.title1': 'ТЯЖКО?',
    'hero.title2': 'ПОГОВОРИМО.',
    'hero.subtitle': 'Лідер домашньої групи • Служіння залежним',
    'hero.cta': 'Написати мені',
    'hero.badge': 'Анонімно • Без осуду • Просто підтримка',

    // Nav
    'nav.book': 'Записатися',

    // Form
    'form.title': 'Напиши мені',
    'form.contact': 'Твій контакт (Telegram або WhatsApp)',
    'form.contactPlaceholder': '@username або +380...',
    'form.message': 'Твоє повідомлення',
    'form.messagePlaceholder': 'Розкажи, що тебе турбує...',
    'form.submit': 'Відправити',
    'form.sending': 'Надсилаємо...',
    'form.privacy': 'Твої дані захищені та анонімні',
    'form.success': 'Дякую! Я відповім найближчим часом.',
    'form.error': 'Помилка. Спробуй ще раз.',
    'form.successTitle': 'Дякуємо!',
    'form.successMessage': 'Ваше повідомлення отримано.',
    'form.successReply': "Павло зв'яжеться з вами найближчим часом.",
    'form.sendAnother': '← Надіслати ще одне повідомлення',

    // Footer
    'footer.quote': '«Прийдіть до Мене, всі втомлені й обтяжені, і Я заспокою вас.»',
    'footer.quoteSource': '— Матвія 11:28',
  },
  ru: {
    // Hero
    'hero.title1': 'ТЯЖЕЛО?',
    'hero.title2': 'ПОГОВОРИМ.',
    'hero.subtitle': 'Лидер домашней группы • Служение зависимым',
    'hero.cta': 'Написать мне',
    'hero.badge': 'Анонимно • Без осуждения • Просто поддержка',

    // Nav
    'nav.book': 'Записаться',

    // Form
    'form.title': 'Напиши мне',
    'form.contact': 'Твой контакт (Telegram или WhatsApp)',
    'form.contactPlaceholder': '@username или +380...',
    'form.message': 'Твоё сообщение',
    'form.messagePlaceholder': 'Расскажи, что тебя беспокоит...',
    'form.submit': 'Отправить',
    'form.sending': 'Отправляем...',
    'form.privacy': 'Твои данные защищены и анонимны',
    'form.success': 'Спасибо! Я отвечу в ближайшее время.',
    'form.error': 'Ошибка. Попробуй ещё раз.',
    'form.successTitle': 'Спасибо!',
    'form.successMessage': 'Ваше сообщение получено.',
    'form.successReply': 'Павел свяжется с вами в ближайшее время.',
    'form.sendAnother': '← Отправить ещё одно сообщение',

    // Footer
    'footer.quote': '«Придите ко Мне, все труждающиеся и обременённые, и Я успокою вас.»',
    'footer.quoteSource': '— Матфея 11:28',
  },
  en: {
    // Hero
    'hero.title1': 'STRUGGLING?',
    'hero.title2': "LET'S TALK.",
    'hero.subtitle': 'Home group leader • Addiction ministry',
    'hero.cta': 'Write to me',
    'hero.badge': 'Anonymous • No judgment • Just support',

    // Nav
    'nav.book': 'Book a call',

    // Form
    'form.title': 'Write to me',
    'form.contact': 'Your contact (Telegram or WhatsApp)',
    'form.contactPlaceholder': '@username or +380...',
    'form.message': 'Your message',
    'form.messagePlaceholder': 'Tell me what worries you...',
    'form.submit': 'Send',
    'form.sending': 'Sending...',
    'form.privacy': 'Your data is protected and anonymous',
    'form.success': 'Thank you! I will respond soon.',
    'form.error': 'Error. Please try again.',
    'form.successTitle': 'Thank you!',
    'form.successMessage': 'Your message has been received.',
    'form.successReply': 'Pavel will contact you soon.',
    'form.sendAnother': '← Send another message',

    // Footer
    'footer.quote': '"Come to Me, all who are weary and burdened, and I will give you rest."',
    'footer.quoteSource': '— Matthew 11:28',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ua');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
