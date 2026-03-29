import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import AboutBrand from '@/components/AboutBrand';

// Lazy-load heavier sections that live below the fold
const ProductSliderSection = dynamic(() => import('@/components/ProductSliderSection'), {
  loading: () => <div style={{ minHeight: '50vh' }} />,
});
const Lifestyle = dynamic(() => import('@/components/Lifestyle'), {
  loading: () => <div style={{ minHeight: '60vh' }} />,
});
const HowToBuy = dynamic(() => import('@/components/HowToBuy'), {
  loading: () => <div style={{ minHeight: '40vh' }} />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div style={{ minHeight: '40vh' }} />,
});
const InstagramSection = dynamic(() => import('@/components/InstagramSection'), {
  loading: () => <div style={{ minHeight: '50vh' }} />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <AboutBrand />
      <ProductSliderSection />
      <Lifestyle />
      <HowToBuy />
      <FAQ />
      <InstagramSection />
    </>
  );
}
