import { FC } from 'react';

import HeroSection from '@shared/ui/HeroSection';
import MainQuote from '@shared/ui/MainQuote';
import MaleCatalogPreview from '@shared/ui/MaleCatalogPreview';
import FemaleCatalogPreview from '@shared/ui/FemaleCatalogPreview';
import Footer from '@shared/ui/footer';

const HomePage: FC = () => {
  return ( <>
    
      <HeroSection />
      <MainQuote />
      <MaleCatalogPreview />
      <FemaleCatalogPreview />
      <Footer />
    
    </>);
};

export default HomePage; 