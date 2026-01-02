import React from 'react';

export interface Review {
  id: number;
  text: string;
  author: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PainPoint {
  icon: any;
  title: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
}