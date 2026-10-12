import Faq from '@/components/inner-pages/faq';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Preguntas frecuentes',
  description: 'Respondemos las preguntas más frecuentes sobre compra, venta y alquiler de propiedades en Rawson, Playa Unión y el Valle del Río Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/faq',
  },
  openGraph: {
    title: 'Preguntas frecuentes - iPropietas',
    description: 'Respondemos las dudas más comunes sobre propiedades en Rawson y Playa Unión.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <Faq />
    </Wrapper>
  );
};

export default index;
