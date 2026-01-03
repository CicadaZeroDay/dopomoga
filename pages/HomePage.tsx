import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PainPoints from '../components/PainPoints';
import Bio from '../components/Bio';
import Specializations from '../components/Specializations';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BibleQuote from '../components/BibleQuote';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import BackToTop from '../components/BackToTop';
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
      <Stats />
      <PainPoints />
      <Bio />
      <Specializations />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <BibleQuote />
      <ContactForm />
      <Footer />
      <FloatingCTA />
      <BackToTop />
    </>
  );
};

export default HomePage;
