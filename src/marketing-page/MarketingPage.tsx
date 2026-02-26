import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import StatsSection from './components/StatsSection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { AnimatedSection } from '../components/AnimatedSection';

export default function MarketingPage() {
  return (
    <>
      <AppAppBar />
      <Hero />
      <StatsSection />
      <div>
        <AnimatedSection>
          <LogoCollection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Features />
        </AnimatedSection>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <AnimatedSection delay={0.1}>
          <Testimonials />
        </AnimatedSection>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <AnimatedSection delay={0.1}>
          <Highlights />
        </AnimatedSection>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <AnimatedSection delay={0.1}>
          <Pricing />
        </AnimatedSection>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <AnimatedSection delay={0.1}>
          <FAQ />
        </AnimatedSection>
        <CTASection />
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <Footer />
      </div>
    </>
  );
}
