import { useSelector } from 'react-redux';
import Hero from '../components/home/Hero';
import FeaturedTopics from '../components/home/FeaturedTopics';
import QuoteWidget from '../components/home/QuoteWidget';
import HowItWorks from '../components/home/HowItWorks';
import StatsSection from '../components/home/StatsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedTopics />
      <QuoteWidget />
      <HowItWorks />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Home;
