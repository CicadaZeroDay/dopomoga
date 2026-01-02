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
    'hero.description1': 'Безпечний простір для розмови про те, що турбує.',
    'hero.description2': 'Без осуду. Анонімно. Безкоштовно.',
    'hero.anonymous': 'Анонімно',
    'hero.noJudgment': 'Без осуду',
    'hero.free': 'Безкоштовно',
    'hero.photoAlt': 'Паша',
    'hero.supported': 'отримали підтримку',

    // Nav
    'nav.book': 'Записатися',
    'nav.blog': 'Блог',
    'nav.home': 'Головна',
    'nav.backHome': '← На головну',

    // Blog
    'blog.all': 'Всі',
    'blog.readMore': 'Читати далі',
    'blog.noArticles': 'Поки що немає статей. Скоро тут з\'являться корисні матеріали!',

    // Article
    'article.toc': 'Зміст',
    'article.readTime': 'хв читання',
    'article.share': 'Поділитись',
    'article.related': 'Схожі статті',
    'article.linkCopied': 'Посилання скопійовано!',

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
    'footer.tagline': 'Твоя душа, наша турбота',
    'footer.readBlog': 'Читати блог',
    'footer.rights': 'Всі права захищено.',
  },
  ru: {
    // Hero
    'hero.title1': 'ТЯЖЕЛО?',
    'hero.title2': 'ПОГОВОРИМ.',
    'hero.subtitle': 'Лидер домашней группы • Служение зависимым',
    'hero.cta': 'Написать мне',
    'hero.badge': 'Анонимно • Без осуждения • Просто поддержка',
    'hero.description1': 'Безопасное пространство для разговора о том, что беспокоит.',
    'hero.description2': 'Без осуждения. Анонимно. Бесплатно.',
    'hero.anonymous': 'Анонимно',
    'hero.noJudgment': 'Без осуждения',
    'hero.free': 'Бесплатно',
    'hero.photoAlt': 'Паша',
    'hero.supported': 'получили поддержку',

    // Nav
    'nav.book': 'Записаться',
    'nav.blog': 'Блог',
    'nav.home': 'Главная',
    'nav.backHome': '← На главную',

    // Blog
    'blog.all': 'Все',
    'blog.readMore': 'Читать далее',
    'blog.noArticles': 'Пока нет статей. Скоро здесь появятся полезные материалы!',

    // Article
    'article.toc': 'Содержание',
    'article.readTime': 'мин чтения',
    'article.share': 'Поделиться',
    'article.related': 'Похожие статьи',
    'article.linkCopied': 'Ссылка скопирована!',

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
    'footer.tagline': 'Твоя душа, наша забота',
    'footer.readBlog': 'Читать блог',
    'footer.rights': 'Все права защищены.',
  },
  en: {
    // Hero
    'hero.title1': 'STRUGGLING?',
    'hero.title2': "LET'S TALK.",
    'hero.subtitle': 'Home group leader • Addiction ministry',
    'hero.cta': 'Write to me',
    'hero.badge': 'Anonymous • No judgment • Just support',
    'hero.description1': 'A safe space to talk about what troubles you.',
    'hero.description2': 'No judgment. Anonymous. Free.',
    'hero.anonymous': 'Anonymous',
    'hero.noJudgment': 'No judgment',
    'hero.free': 'Free',
    'hero.photoAlt': 'Pasha',
    'hero.supported': 'received support',

    // Nav
    'nav.book': 'Book a call',
    'nav.blog': 'Blog',
    'nav.home': 'Home',
    'nav.backHome': '← Back home',

    // Blog
    'blog.all': 'All',
    'blog.readMore': 'Read more',
    'blog.noArticles': 'No articles yet. Useful content coming soon!',

    // Article
    'article.toc': 'Contents',
    'article.readTime': 'min read',
    'article.share': 'Share',
    'article.related': 'Related articles',
    'article.linkCopied': 'Link copied!',

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
    'footer.tagline': 'Your soul, our care',
    'footer.readBlog': 'Read blog',
    'footer.rights': 'All rights reserved.',
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
