import React from 'react';
import Hero from '../components/Hero';
import BibleQuote from '../components/BibleQuote';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import SEOHead from '../components/SEO/SEOHead';
import { OrganizationSchema, WebSiteSchema, FAQSchema } from '../components/SEO/JsonLd';
import { FAQS } from '../constants';

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead />
      <OrganizationSchema />
      <WebSiteSchema />
      <FAQSchema items={FAQS} />

      <Hero />
      <BibleQuote />
      <ContactForm />
      <Footer />
    </>
  );
};

export default HomePage;
