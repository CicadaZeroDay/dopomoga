import React from 'react';

// Декоративний розділювач з іхтисом
export const SectionDivider: React.FC = () => (
  <div className="flex items-center justify-center my-10 gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/30 flex-1" />
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      className="text-primary/40"
    >
      <path
        d="M4 8 Q12 2 20 8 Q12 14 4 8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M20 8 L26 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 8 L26 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <div className="h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/30 flex-1" />
  </div>
);

// Іконка лапок для цитат
export const QuoteIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" opacity="0.3" />
  </svg>
);

// Іконка книги для біблійних цитат
export const BibleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M12 6v8" />
    <path d="M8 10h8" />
  </svg>
);

// Іконка лампочки для важливих тез
export const ImportantIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

// Іконка серця
export const HeartIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Іконка галочки для списків
export const CheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Хвиля для декору
export const WaveDecoration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1200 60"
    preserveAspectRatio="none"
    className={`w-full h-6 ${className}`}
  >
    <path
      d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
      fill="currentColor"
      opacity="0.1"
    />
  </svg>
);

// Нумерований маркер для секцій
export const NumberBadge: React.FC<{ number: number; className?: string }> = ({
  number,
  className = '',
}) => (
  <span
    className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold ${className}`}
  >
    {number}
  </span>
);

export default {
  SectionDivider,
  QuoteIcon,
  BibleIcon,
  ImportantIcon,
  HeartIcon,
  CheckIcon,
  WaveDecoration,
  NumberBadge,
};
