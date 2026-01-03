import React from 'react';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import Bio from '../components/Bio';
import Specializations from '../components/Specializations';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
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
      <PainPoints />
      <Bio />
      <Specializations />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <BibleQuote />
      <ContactForm />
      <Footer />
    </>
  );
};

export default HomePage;
