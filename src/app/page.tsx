import HomeFour from '@/components/homes/home-four';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'iPropietas — Inmobiliaria en Argentina',
  description: 'Encontrá las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler. iPropietas, tu inmobiliaria en la Patagonia.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/',
  },
  openGraph: {
    title: 'iPropietas — Inmobiliaria en Argentina',
    description: 'Encontrá las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <HomeFour />
    </Wrapper>
  );
};

export default index;
