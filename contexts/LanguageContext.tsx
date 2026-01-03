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

    // Pain Points
    'painPoints.title': 'Тобі знайоме це відчуття?',
    'painPoints.subtitle': 'Ти не сам. Є хтось, хто розуміє.',

    // Bio
    'bio.title': 'Хто такий Паша?',
    'bio.point1': 'Переїхав з України до Великобританії через війну',
    'bio.point2': 'Підприємець, чоловік, батько',
    'bio.point3': 'Пастор з досвідом душепопічництва та реабілітації',
    'bio.point4': 'Спеціалізація: ПТСР, залежності, міграція',
    'bio.point5': 'Фокус на чоловіках у кризі',
    'bio.quote': '«Я сам пережив війну, втрату дому, адаптацію на чужині. Знаю, що таке бути підприємцем, чоловіком і батьком у кризі. Тому я тут — щоб пройти цей шлях разом з тобою.»',

    // Specializations
    'spec.title': 'Чим я можу допомогти',
    'spec.subtitle': 'Кожна людина унікальна, але деякі виклики об\'єднують нас',
    'spec.ptsd': 'ПТСР та травми',
    'spec.ptsdDesc': 'Допомога жертвам війни та насильства',
    'spec.addiction': 'Залежності',
    'spec.addictionDesc': 'Алкоголь, наркотики, ігри, порно',
    'spec.migration': 'Міграція',
    'spec.migrationDesc': 'Адаптація біженців та іммігрантів',
    'spec.family': 'Сімейні кризи',
    'spec.familyDesc': 'Конфлікти, розлучення, виховання',
    'spec.identity': 'Чоловіча ідентичність',
    'spec.identityDesc': 'Пошук себе, цілей, сили',
    'spec.business': 'Підприємці',
    'spec.businessDesc': 'Стрес, вигорання, баланс',

    // How It Works
    'howItWorks.title': 'Три простих кроки',
    'howItWorks.subtitle': 'Шлях до відновлення починається тут',
    'howItWorks.step1': 'Запишись на бесіду',
    'howItWorks.step1Desc': 'Обери зручний час. Це безкоштовно.',
    'howItWorks.step2': 'Поговоримо онлайн',
    'howItWorks.step2Desc': 'Безпечна відео-розмова наодинці.',
    'howItWorks.step3': 'Знайдеш мир',
    'howItWorks.step3Desc': 'Крок за кроком до зцілення.',

    // Testimonials
    'testimonials.title': 'Що кажуть люди',

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
    'footer.subscribeTitle': 'Отримуй підтримку',
    'footer.subscribeDesc': 'Підпишись на корисні матеріали та надихаючі повідомлення',
    'footer.subscribeSuccess': 'Дякую! Ви підписані.',
    'footer.emailPlaceholder': 'Ваш email',

    // Floating CTA
    'floatingCta.text': 'Написати',

    // Stats
    'stats.supported': 'Людей отримали підтримку',
    'stats.years': 'Років досвіду',
    'stats.countries': 'Країн',
    'stats.available': 'Доступність',
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

    // Pain Points
    'painPoints.title': 'Тебе знакомо это чувство?',
    'painPoints.subtitle': 'Ты не один. Есть тот, кто понимает.',

    // Bio
    'bio.title': 'Кто такой Паша?',
    'bio.point1': 'Переехал из Украины в Великобританию из-за войны',
    'bio.point2': 'Предприниматель, муж, отец',
    'bio.point3': 'Пастор с опытом душепопечительства и реабилитации',
    'bio.point4': 'Специализация: ПТСР, зависимости, миграция',
    'bio.point5': 'Фокус на мужчинах в кризисе',
    'bio.quote': '«Я сам пережил войну, потерю дома, адаптацию на чужбине. Знаю, каково быть предпринимателем, мужем и отцом в кризисе. Поэтому я здесь — чтобы пройти этот путь вместе с тобой.»',

    // Specializations
    'spec.title': 'Чем я могу помочь',
    'spec.subtitle': 'Каждый человек уникален, но некоторые вызовы объединяют нас',
    'spec.ptsd': 'ПТСР и травмы',
    'spec.ptsdDesc': 'Помощь жертвам войны и насилия',
    'spec.addiction': 'Зависимости',
    'spec.addictionDesc': 'Алкоголь, наркотики, игры, порно',
    'spec.migration': 'Миграция',
    'spec.migrationDesc': 'Адаптация беженцев и иммигрантов',
    'spec.family': 'Семейные кризисы',
    'spec.familyDesc': 'Конфликты, разводы, воспитание',
    'spec.identity': 'Мужская идентичность',
    'spec.identityDesc': 'Поиск себя, целей, силы',
    'spec.business': 'Предприниматели',
    'spec.businessDesc': 'Стресс, выгорание, баланс',

    // How It Works
    'howItWorks.title': 'Три простых шага',
    'howItWorks.subtitle': 'Путь к восстановлению начинается здесь',
    'howItWorks.step1': 'Запишись на беседу',
    'howItWorks.step1Desc': 'Выбери удобное время. Это бесплатно.',
    'howItWorks.step2': 'Поговорим онлайн',
    'howItWorks.step2Desc': 'Безопасный видео-разговор наедине.',
    'howItWorks.step3': 'Найдёшь покой',
    'howItWorks.step3Desc': 'Шаг за шагом к исцелению.',

    // Testimonials
    'testimonials.title': 'Что говорят люди',

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
    'footer.subscribeTitle': 'Получай поддержку',
    'footer.subscribeDesc': 'Подпишись на полезные материалы и вдохновляющие сообщения',
    'footer.subscribeSuccess': 'Спасибо! Вы подписаны.',
    'footer.emailPlaceholder': 'Ваш email',

    // Floating CTA
    'floatingCta.text': 'Написать',

    // Stats
    'stats.supported': 'Людей получили поддержку',
    'stats.years': 'Лет опыта',
    'stats.countries': 'Стран',
    'stats.available': 'Доступность',
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

    // Pain Points
    'painPoints.title': 'Does this feel familiar?',
    'painPoints.subtitle': "You're not alone. Someone understands.",

    // Bio
    'bio.title': 'Who is Pasha?',
    'bio.point1': 'Moved from Ukraine to UK due to war',
    'bio.point2': 'Entrepreneur, husband, father',
    'bio.point3': 'Pastor with counseling and rehabilitation experience',
    'bio.point4': 'Specialization: PTSD, addictions, migration',
    'bio.point5': 'Focus on men in crisis',
    'bio.quote': '"I myself lived through war, loss of home, adaptation abroad. I know what it\'s like to be an entrepreneur, husband and father in crisis. That\'s why I\'m here — to walk this path together with you."',

    // Specializations
    'spec.title': 'How I can help',
    'spec.subtitle': 'Every person is unique, but some challenges unite us',
    'spec.ptsd': 'PTSD & Trauma',
    'spec.ptsdDesc': 'Help for war and violence survivors',
    'spec.addiction': 'Addictions',
    'spec.addictionDesc': 'Alcohol, drugs, gaming, porn',
    'spec.migration': 'Migration',
    'spec.migrationDesc': 'Refugee and immigrant adaptation',
    'spec.family': 'Family Crisis',
    'spec.familyDesc': 'Conflicts, divorce, parenting',
    'spec.identity': 'Male Identity',
    'spec.identityDesc': 'Finding yourself, purpose, strength',
    'spec.business': 'Entrepreneurs',
    'spec.businessDesc': 'Stress, burnout, balance',

    // How It Works
    'howItWorks.title': 'Three simple steps',
    'howItWorks.subtitle': 'The path to recovery starts here',
    'howItWorks.step1': 'Book a conversation',
    'howItWorks.step1Desc': 'Choose a convenient time. It\'s free.',
    'howItWorks.step2': 'We talk online',
    'howItWorks.step2Desc': 'Safe private video call.',
    'howItWorks.step3': 'Find peace',
    'howItWorks.step3Desc': 'Step by step to healing.',

    // Testimonials
    'testimonials.title': 'What people say',

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
    'footer.subscribeTitle': 'Get support',
    'footer.subscribeDesc': 'Subscribe for helpful content and inspiring messages',
    'footer.subscribeSuccess': 'Thank you! You are subscribed.',
    'footer.emailPlaceholder': 'Your email',

    // Floating CTA
    'floatingCta.text': 'Write',

    // Stats
    'stats.supported': 'People received support',
    'stats.years': 'Years of experience',
    'stats.countries': 'Countries',
    'stats.available': 'Availability',
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
