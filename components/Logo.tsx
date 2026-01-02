import React from 'react';
import { motion } from 'framer-motion';

const MotionSvg = motion.svg as any;
const MotionG = motion.g as any;
const MotionPath = motion.path as any;

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'horizontal' | 'compact' | 'icon';
  showText?: boolean;
  animate?: boolean;
}

// Варіанти анімації
const swimVariants = {
  animate: {
    x: [0, 2, -2, 1, 0],
    y: [0, -1, 1, -0.5, 0],
    rotate: [0, 2, -2, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pathDrawVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" }
  }
};

const tailWagVariants = {
  animate: {
    rotate: [0, 10, -10, 5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  variant = 'icon',
  showText = false,
  animate = true
}) => {
  // Цвета из палитры
  const primaryColor = '#5B8A72';
  const lightColor = '#FBF9F7';

  if (variant === 'icon') {
    // Иконка - форма ихтис с хвостом с анімацією
    return (
      <MotionSvg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.1, rotate: 5 }}
        variants={animate ? swimVariants : undefined}
      >
        <MotionG
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Тело ихтис */}
          <MotionPath
            d="M7 16 Q16 7 25 16 Q16 25 7 16"
            variants={pathDrawVariants}
          />
          {/* Хвост з анімацією */}
          <MotionG
            style={{ originX: '25px', originY: '16px' }}
            variants={tailWagVariants}
          >
            <MotionPath
              d="M25 16 L29 12"
              variants={pathDrawVariants}
            />
            <MotionPath
              d="M25 16 L29 20"
              variants={pathDrawVariants}
            />
          </MotionG>
        </MotionG>
      </MotionSvg>
    );
  }

  if (variant === 'full') {
    // Полный логотип - ихтис в круге
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Фоновый круг */}
        <circle cx="50" cy="50" r="45" fill={primaryColor}/>

        {/* Ихтис */}
        <g stroke={lightColor} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 50 Q50 25 80 50 Q50 75 20 50"/>
          <path d="M80 50 L90 40"/>
          <path d="M80 50 L90 60"/>
        </g>

        {/* Текст (если нужно) */}
        {showText && (
          <text
            x="50"
            y="95"
            fontFamily="Inter, sans-serif"
            fontSize="10"
            fontWeight="500"
            fill={primaryColor}
            textAnchor="middle"
          >
            dopomoga.me
          </text>
        )}
      </svg>
    );
  }

  if (variant === 'horizontal') {
    // Горизонтальный логотип с текстом
    return (
      <svg
        width={size * 4}
        height={size}
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Ихтис */}
        <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 25 Q25 10 45 25 Q25 40 5 25"/>
          <path d="M45 25 L52 18"/>
          <path d="M45 25 L52 32"/>
        </g>

        {/* Текст */}
        <text
          x="65"
          y="32"
          fontFamily="Inter, sans-serif"
          fontSize="22"
          fontWeight="600"
          fill="currentColor"
          letterSpacing="0.5"
        >
          dopomoga
        </text>
      </svg>
    );
  }

  if (variant === 'compact') {
    // Компактный вариант
    return (
      <svg
        width={size * 3}
        height={size}
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Ихтис */}
        <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 20 Q20 8 35 20 Q20 32 5 20"/>
          <path d="M35 20 L42 13"/>
          <path d="M35 20 L42 27"/>
        </g>

        {/* Текст */}
        <text
          x="50"
          y="26"
          fontFamily="Inter, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
          letterSpacing="0.3"
        >
          dopomoga
        </text>
      </svg>
    );
  }

  return null;
};

export default Logo;
