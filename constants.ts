import { Heart, Home, UserX, CloudFog, Calendar, Video, Sun } from 'lucide-react';
import { PainPoint, Step, Review, FAQItem } from './types';

// Original photo with background (from public folder)
export const EXPERT_IMAGE = "/pasha-original.png"; 

export const PAIN_POINTS: PainPoint[] = [
  { icon: CloudFog, title: 'Тривога, яка не відпускає' },
  { icon: Home, title: 'Біль від втрати дому чи близьких' },
  { icon: UserX, title: 'Відчуття самотності на чужині' },
  { icon: Heart, title: 'Страх за майбутнє' },
];

export const STEPS: Step[] = [
  { 
    id: 1, 
    title: 'Запишись на бесіду', 
    description: 'Обери зручний час. Це безкоштовно.',
    icon: Calendar
  },
  { 
    id: 2, 
    title: 'Поговоримо онлайн', 
    description: 'Безпечна відео-розмова наодинці.',
    icon: Video
  },
  { 
    id: 3, 
    title: 'Знайдеш мир', 
    description: 'Крок за кроком до зцілення.',
    icon: Sun
  },
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    text: "Після розмови я вперше за півроку змогла нормально заснути. Відчуття, що мене справді почули.",
    author: "Марія",
    role: "34 роки, Польща"
  },
  {
    id: 2,
    text: "Я думав, що чоловіки не плачуть і мають тримати все в собі. Паша показав, що сила в чесності перед собою.",
    author: "Андрій",
    role: "42 роки, Київ"
  },
  {
    id: 3,
    text: "Дуже делікатний підхід. Ніякого тиску, тільки підтримка і розуміння. Дякую за цей простір.",
    author: "Олена",
    role: "28 років, Німеччина"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Це безкоштовно?",
    answer: "Так, усі бесіди є повністю безкоштовними. Це моє служіння та вклад у підтримку українців."
  },
  {
    question: "Чи це конфіденційно?",
    answer: "Абсолютно. Все, що сказано під час бесіди, залишається між нами. Це безпечний простір."
  },
  {
    question: "Я не релігійна людина — це для мене?",
    answer: "Так. Я пастор, але я не нав'язую релігію. Ми говоримо про ваші почуття, біль та пошук опори мовою, яка комфортна вам."
  },
  {
    question: "Як записатися?",
    answer: "Натисніть кнопку 'Записатися' та оберіть зручний час у календарі, або напишіть мені в Telegram."
  }
];

export const SOCIAL_LINKS = {
  telegram: "https://t.me/pasha_grishko",
  calendar: "#book"
};