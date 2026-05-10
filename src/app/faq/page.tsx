import Faq from '@/components/inner-pages/faq';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Preguntas frecuentes - iPropietas',
  description: 'Respondemos las preguntas más frecuentes sobre compra, venta y alquiler de propiedades en Argentina. Todo lo que necesitás saber sobre iPropietas.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/faq',
  },
  openGraph: {
    title: 'Preguntas frecuentes - iPropietas',
    description: 'Respondemos las dudas más comunes sobre propiedades en Argentina.',
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
