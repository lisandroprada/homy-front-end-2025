import Contact from '@/components/inner-pages/contact';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Contacto - iPropietas',
  description: 'Contactá a iPropietas para consultas sobre propiedades en venta o alquiler en Argentina. Estamos en Rawson, Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/contact',
  },
  openGraph: {
    title: 'Contacto - iPropietas',
    description: 'Contactá a iPropietas para consultas sobre propiedades en venta o alquiler en Argentina.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <Contact />
    </Wrapper>
  );
};

export default index;
