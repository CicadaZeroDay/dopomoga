import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Shield, AlertCircle, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { saveLead } from '../lib/supabase';
import { getUTMParams, UTMParams } from '../lib/utm';

const MotionDiv = motion.div as any;

const TELEGRAM_BOT_TOKEN = '8134878708:AAFliZEN2W7Y2dhbSBAFhoVSQGoec6i2d8s';
const TELEGRAM_CHAT_IDS = ['1810108584', '93826062']; // Отправка на оба ID

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// Анимированная галочка успеха
const SuccessCheckmark: React.FC = () => (
  <svg className="w-20 h-20" viewBox="0 0 100 100">
    <motion.circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="#5B8A72"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
    <motion.path
      d="M30 50 L45 65 L70 35"
      fill="none"
      stroke="#5B8A72"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
    />
  </svg>
);

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  // Сохраняем UTM параметры при загрузке
  useEffect(() => {
    setUtmParams(getUTMParams());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contact.trim() || !message.trim()) return;

    setStatus('sending');

    const text = `📩 Нове повідомлення з dopomoga.me\n\n👤 Контакт: ${contact}\n\n💬 Повідомлення:\n${message}`;

    try {
      // Сохраняем в Supabase (параллельно с Telegram)
      const supabasePromise = saveLead({
        contact: contact.trim(),
        message: message.trim(),
        language,
        ...utmParams,
      });

      // Отправляем в Telegram на все ID параллельно
      const telegramPromises = TELEGRAM_CHAT_IDS.map(chatId =>
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML',
          }),
        })
      );

      // Ждём все запросы
      const [supabaseResult, ...telegramResponses] = await Promise.all([
        supabasePromise,
        ...telegramPromises,
      ]);

      const telegramOk = telegramResponses.every(r => r.ok);

      // Успех если Telegram отправился (Supabase - бонус)
      if (telegramOk) {
        setStatus('success');
        setContact('');
        setMessage('');

        // Логируем если Supabase не сработал
        if (!supabaseResult.success) {
          console.warn('Supabase save failed:', supabaseResult.error);
        }
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const resetForm = () => {
    setStatus('idle');
  };

  return (
    <section id="contact-form" className="py-20 md:py-32 bg-light">
      <div className="max-w-xl mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* Экран успешной отправки */
              <MotionDiv
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                {/* Анимированная галочка */}
                <div className="flex justify-center mb-6">
                  <SuccessCheckmark />
                </div>

                {/* Заголовок */}
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                    {t('form.successTitle') || 'Дякуємо!'}
                  </h3>
                </MotionDiv>

                {/* Сообщение */}
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-textMuted text-lg mb-2">
                    {t('form.successMessage') || 'Ваше повідомлення отримано.'}
                  </p>
                  <p className="text-textMuted">
                    {t('form.successReply') || "Павло зв'яжеться з вами найближчим часом."}
                  </p>
                </MotionDiv>

                {/* Иконка сердца */}
                <MotionDiv
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="mt-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </MotionDiv>

                {/* Кнопка отправить ещё */}
                <MotionDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8"
                >
                  <button
                    onClick={resetForm}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t('form.sendAnother') || '← Надіслати ще одне повідомлення'}
                  </button>
                </MotionDiv>
              </MotionDiv>
            ) : (
              /* Форма */
              <MotionDiv
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-textDark text-center mb-8">
                  {t('form.title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Field */}
                  <div>
                    <label className="block text-textMuted text-sm mb-2">
                      {t('form.contact')}
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={t('form.contactPlaceholder')}
                      className="w-full px-5 py-4 bg-light border border-gray-200 rounded-xl text-textDark placeholder:text-textMuted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      disabled={status === 'sending'}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-textMuted text-sm mb-2">
                      {t('form.message')}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('form.messagePlaceholder')}
                      rows={5}
                      maxLength={500}
                      className="w-full px-5 py-4 bg-light border border-gray-200 rounded-xl text-textDark placeholder:text-textMuted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                      disabled={status === 'sending'}
                    />
                    <div className="text-right text-textMuted/50 text-xs mt-1">
                      {message.length}/500
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending' || !contact.trim() || !message.trim()}
                    className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t('form.sending') || 'Надсилаємо...'}</span>
                      </>
                    ) : status === 'error' ? (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        {t('form.error')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('form.submit')}
                      </>
                    )}
                  </button>
                </form>

                {/* Privacy Note */}
                <div className="mt-6 flex items-center justify-center gap-2 text-textMuted text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>{t('form.privacy')}</span>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        </MotionDiv>
      </div>
    </section>
  );
};

export default ContactForm;
